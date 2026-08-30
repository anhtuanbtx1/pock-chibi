'use client';

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

export function Gallery({
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
  const settingsRef = useRef({ speed, scale });
  settingsRef.current = { speed, scale };

  const [hoveredCard, setHoveredCard] = useState<GalleryCardItem | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
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

    // Optimized Card Geometry:
    // Radius = 4.4, Height = 2.8, Arc Length = 0.44 rad (~25.2 deg)
    // Physical Arc Width = 4.4 * 0.44 = 1.936 units
    // Aspect Ratio = 1.936 / 2.8 = 0.691 (portrait 1:1.44 chibi card proportion)
    const radius = 4.4;
    const panelHeight = 2.8;
    const panelArc = 0.44;
    const panelAspect = (radius * panelArc) / panelHeight;

    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      panelHeight,
      48,
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

    // Determine card items and image URLs
    const cardItems: GalleryCardItem[] = (cards && cards.length > 0)
      ? cards
      : (images && images.length > 0)
        ? images.map((url, i) => ({ coreName: `Thẻ bài #${i + 1}`, image: url }))
        : [
            { coreName: "Nguyên Thủy Thiên Tôn", image: "/assets/media_1787939166360.jpg" },
            { coreName: "Linh Bảo Thiên Tôn", image: "/assets/card-back.svg" },
          ];

    const textures = cardItems.map((item) => {
      const texture = loader.load(item.image, () => {
        if (disposed) {
          texture.dispose();
          return;
        }
        // Perfect texture aspect ratio cover to eliminate horizontal/vertical stretching
        if (texture.image && texture.image.width && texture.image.height) {
          const imgAspect = texture.image.width / texture.image.height;
          if (imgAspect > panelAspect) {
            const factor = panelAspect / imgAspect;
            texture.repeat.set(factor, 1);
            texture.offset.set((1 - factor) * 0.5, 0);
          } else {
            const factor = imgAspect / panelAspect;
            texture.repeat.set(1, factor);
            texture.offset.set(0, (1 - factor) * 0.5);
          }
          texture.needsUpdate = true;
        }
        renderer.render(scene, camera);
      });

      if ('colorSpace' in texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
      } else {
        (texture as any).encoding = (THREE as any).sRGBEncoding;
      }
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    });

    const materials = Array.from({ length: 16 }, (_, index) => {
      const tex = textures[index % textures.length];
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
    let pointerStartY = 0;
    let lastPointerX = 0;
    let dragVelocity = 0;
    let dragDistance = 0;

    const render = (time = performance.now()) => {
      const safeSpeed = clamp(settingsRef.current.speed, 0, 3);
      const safeScale = clamp(settingsRef.current.scale, 0.7, 1.35);

      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0.016;
      previousTime = time;

      if (!isDragging) {
        elapsed += delta * safeSpeed;
        // Damping for drag velocity
        dragVelocity *= 0.92;
        gallery.rotation.y += (delta * 0.16 * safeSpeed) + dragVelocity;
      }

      gallery.position.y = Math.sin(elapsed * 0.8) * 0.7;
      gallery.scale.setScalar(safeScale);

      // Smooth hover scaling for panels
      for (const panel of panelMeshes) {
        const target = panel.userData.targetScale || 1;
        panel.userData.currentScale += (target - panel.userData.currentScale) * 0.12;
        const s = panel.userData.currentScale;
        panel.scale.set(s, s, s);
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
      if (!frame && hostVisible && documentVisible) frame = window.requestAnimationFrame(tick);
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      // Adjust camera distance for mobile viewports
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

    // Raycasting & Pointer Interactions
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

      if (foundIndex !== null && cardItems.length > 0) {
        const target = cardItems[foundIndex % cardItems.length];
        setHoveredCard(target || null);
      } else {
        setHoveredCard(null);
      }

      return foundIndex;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      lastPointerX = e.clientX;
      dragDistance = 0;
      dragVelocity = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastPointerX;
        dragDistance += Math.abs(deltaX);
        dragVelocity = deltaX * 0.004;
        gallery.rotation.y += deltaX * 0.005;
        lastPointerX = e.clientX;
        updateRaycast(e.clientX, e.clientY);
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
        
        // If it was a clean click without significant drag
        if (dragDistance < 8) {
          const hitIdx = updateRaycast(e.clientX, e.clientY);
          if (hitIdx !== null && onSelectIndex) {
            onSelectIndex(hitIdx);
          }
        }
      }
    };

    const onPointerLeave = () => {
      panelMeshes.forEach((p) => {
        p.userData.targetScale = 1;
      });
      setHoveredCard(null);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
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
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [cards, images, onSelectIndex]);

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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/40 text-center shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_16px_rgba(70,148,209,0.4)] animate-in fade-in zoom-in duration-200">
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
}
