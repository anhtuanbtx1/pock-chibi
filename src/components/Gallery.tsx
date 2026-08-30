'use client';

import React, { useEffect, useRef, useState, memo, type CSSProperties } from "react";
import * as THREE from "three";
import "./gallery.css";

export interface GalleryCardItem {
  coreName: string;
  image: string;
  faction?: string;
  categoryLabel?: string;
  rarity?: string;
}

export type GalleryProps = {
  speed?: number;
  scale?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
  images?: string[];
  cards?: GalleryCardItem[];
  onSelectIndex?: (index: number) => void;
};

export const GALLERY_DEFAULTS = {
  speed: 1,
  scale: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const satisfies Required<Pick<GalleryProps, "speed" | "scale" | "opacity" | "hue" | "saturation" | "brightness">>;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export const Gallery = memo(function Gallery({
  speed = GALLERY_DEFAULTS.speed,
  scale = GALLERY_DEFAULTS.scale,
  opacity = GALLERY_DEFAULTS.opacity,
  hue = GALLERY_DEFAULTS.hue,
  saturation = GALLERY_DEFAULTS.saturation,
  brightness = GALLERY_DEFAULTS.brightness,
  className = "",
  style,
  images,
  cards,
  onSelectIndex,
}: GalleryProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store props in refs to prevent WebGL teardowns on re-renders
  const settingsRef = useRef({ speed, scale });
  settingsRef.current = { speed, scale };

  const cardsRef = useRef<GalleryCardItem[]>(cards || []);
  cardsRef.current = cards || [];

  const imagesRef = useRef<string[] | undefined>(images);
  imagesRef.current = images;

  const onSelectIndexRef = useRef(onSelectIndex);
  onSelectIndexRef.current = onSelectIndex;

  const [hoveredCard, setHoveredCard] = useState<GalleryCardItem | null>(null);
  const lastHoveredIdxRef = useRef<number | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      depth: true,
      stencil: false,
    });
    renderer.setClearColor(0x000000, 0);

    if ('outputColorSpace' in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else {
      (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 16;

    const gallery = new THREE.Group();
    scene.add(gallery);

    // Optimized Card Geometry (matches portrait 1:1.44 chibi tarot card proportion)
    const radius = 4.4;
    const panelHeight = 2.8;
    const panelArc = 0.44;
    const panelAspect = (radius * panelArc) / panelHeight;

    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      panelHeight,
      32,
      1,
      true,
      -panelArc * 0.5,
      panelArc
    );

    const loader = new THREE.TextureLoader();
    let disposed = false;
    let frame = 0;
    let elapsed = 0;
    let previousTime = 0;
    let hostVisible = true;
    let documentVisible = !document.hidden;
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Prepare card items
    const rawCards = cardsRef.current;
    const rawImages = imagesRef.current;
    const cardItems: GalleryCardItem[] = (rawCards && rawCards.length > 0)
      ? rawCards
      : (rawImages && rawImages.length > 0)
        ? rawImages.map((url, i) => ({ coreName: `Thẻ bài #${i + 1}`, image: url }))
        : [
            { coreName: "Nguyên Thủy Thiên Tôn", image: "/assets/media_1787939166360.jpg" },
            { coreName: "Linh Bảo Thiên Tôn", image: "/assets/card-back.svg" },
          ];

    // Cache textures to avoid redundant GPU allocations
    const textureCache = new Map<string, THREE.Texture>();

    const getTexture = (url: string) => {
      if (textureCache.has(url)) return textureCache.get(url)!;

      const texture = loader.load(url, (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        if (tex.image && tex.image.width && tex.image.height) {
          const imgAspect = tex.image.width / tex.image.height;
          if (imgAspect > panelAspect) {
            const factor = panelAspect / imgAspect;
            tex.repeat.set(factor, 1);
            tex.offset.set((1 - factor) * 0.5, 0);
          } else {
            const factor = imgAspect / panelAspect;
            tex.repeat.set(1, factor);
            tex.offset.set(0, (1 - factor) * 0.5);
          }
          tex.needsUpdate = true;
        }
      });

      if ('colorSpace' in texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
      } else {
        (texture as any).encoding = (THREE as any).sRGBEncoding;
      }
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureCache.set(url, texture);
      return texture;
    };

    const materials = Array.from({ length: 16 }, (_, index) => {
      const item = cardItems[index % cardItems.length];
      const tex = getTexture(item.image);
      return new THREE.MeshBasicMaterial({
        map: tex,
        opacity: 0.98,
        side: THREE.DoubleSide,
        toneMapped: false,
        transparent: true,
      });
    });

    const panelMeshes: THREE.Mesh[] = [];

    materials.forEach((material, index) => {
      const panel = new THREE.Mesh(geometry, material);
      panel.position.y = (index - 7.5) * 1.05;
      panel.rotation.y = (index / 16) * Math.PI * 4;
      panel.userData = { index, targetScale: 1, currentScale: 1 };

      gallery.add(panel);
      panelMeshes.push(panel);
    });

    // Drag interaction state
    let isDragging = false;
    let pointerStartX = 0;
    let lastPointerX = 0;
    let dragVelocity = 0;
    let dragDistance = 0;

    const render = (time = performance.now()) => {
      const safeSpeed = clamp(settingsRef.current.speed, 0, 3);
      const safeScale = clamp(settingsRef.current.scale, 0.7, 1.35);

      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.04) : 0.016;
      previousTime = time;

      if (!isDragging) {
        elapsed += delta * safeSpeed;
        dragVelocity *= 0.92; // Smooth friction
        gallery.rotation.y += (delta * 0.16 * safeSpeed) + dragVelocity;
      }

      gallery.position.y = Math.sin(elapsed * 0.8) * 0.7;
      gallery.scale.setScalar(safeScale);

      // Smooth hover scale interpolation (cheap per-panel math)
      for (let i = 0; i < panelMeshes.length; i++) {
        const panel = panelMeshes[i];
        const target = panel.userData.targetScale || 1;
        const current = panel.userData.currentScale || 1;
        if (Math.abs(target - current) > 0.002) {
          panel.userData.currentScale += (target - current) * 0.15;
          const s = panel.userData.currentScale;
          panel.scale.set(s, s, s);
        }
      }

      renderer.render(scene, camera);
    };

    const tick = (time: number) => {
      if (disposed || !hostVisible || !documentVisible) {
        frame = 0;
        previousTime = 0;
        return;
      }
      render(time);
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (reducedMotion) {
        render(0);
        return;
      }
      if (!frame && hostVisible && documentVisible) {
        previousTime = performance.now();
        frame = window.requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));

      // Balanced pixel ratio to eliminate GPU stutter on 2K/4K/Retina displays
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      if (width < 640) {
        camera.position.z = 18.5;
      } else {
        camera.position.z = 16.0;
      }

      camera.updateProjectionMatrix();
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      hostVisible = entry?.isIntersecting ?? true;
      if (hostVisible) start();
      else stop();
    });

    const handleVisibility = () => {
      documentVisible = !document.hidden;
      if (documentVisible) start();
      else stop();
    };

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    start();

    // Raycasting & Pointer Interactions (Optimized: Zero React re-renders while dragging)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const updateRaycast = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(panelMeshes, false);

      let foundIndex: number | null = null;
      panelMeshes.forEach((p) => {
        p.userData.targetScale = 1;
      });

      if (hits.length > 0 && hits[0].object) {
        const hitObj = hits[0].object as THREE.Mesh;
        hitObj.userData.targetScale = 1.08;
        foundIndex = hitObj.userData.index;
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      // ONLY trigger React state if the hovered index actually changed!
      if (foundIndex !== lastHoveredIdxRef.current) {
        lastHoveredIdxRef.current = foundIndex;
        const currentList = cardsRef.current.length > 0 ? cardsRef.current : cardItems;
        if (foundIndex !== null && currentList.length > 0) {
          setHoveredCard(currentList[foundIndex % currentList.length] || null);
        } else {
          setHoveredCard(null);
        }
      }

      return foundIndex;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      pointerStartX = e.clientX;
      lastPointerX = e.clientX;
      dragDistance = 0;
      dragVelocity = 0;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastPointerX;
        dragDistance += Math.abs(deltaX);
        dragVelocity = deltaX * 0.005;
        gallery.rotation.y += deltaX * 0.006;
        lastPointerX = e.clientX;
      } else {
        updateRaycast(e.clientX, e.clientY);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}

        if (dragDistance < 8) {
          const hitIdx = updateRaycast(e.clientX, e.clientY);
          if (hitIdx !== null && onSelectIndexRef.current) {
            onSelectIndexRef.current(hitIdx);
          }
        }
      }
    };

    const onPointerLeave = () => {
      panelMeshes.forEach((p) => {
        p.userData.targetScale = 1;
      });
      if (lastHoveredIdxRef.current !== null) {
        lastHoveredIdxRef.current = null;
        setHoveredCard(null);
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      gallery.clear();
      geometry.dispose();
      materials.forEach((material) => material.dispose());
      textureCache.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []); // Run ONLY once on mount, zero WebGL rebuilds on parent re-renders!

  return (
    <div
      ref={hostRef}
      className={`threeui-background gallery${className ? ` ${className}` : ""}`}
      data-mode="light"
      role="img"
      aria-label="Rotating cylindrical image gallery"
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="gallery__canvas"
        aria-hidden="true"
        style={{
          opacity: clamp(opacity, 0.05, 1),
          filter: `hue-rotate(${clamp(hue, -180, 180)}deg) saturate(${clamp(saturation, 0, 2)}) brightness(${clamp(brightness, 0.35, 1.65)})`,
        }}
      />

      {/* Interactive Hover Pill Tooltip */}
      {hoveredCard && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-cyan-400/50 text-center shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_16px_rgba(70,148,209,0.4)] animate-in fade-in zoom-in duration-150">
          <div className="text-xs font-black text-[#87dff6] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <span>✨</span>
            <span>{hoveredCard.coreName}</span>
          </div>
          <div className="text-[10px] text-white/60 font-semibold">
            {hoveredCard.faction || 'Bấm để xem chi tiết thẻ bài'}
          </div>
        </div>
      )}
    </div>
  );
});
