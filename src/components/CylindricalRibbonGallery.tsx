'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { Sparkles, Compass, Eye, RotateCw } from 'lucide-react';

export interface RibbonCardItem {
  coreName: string;
  image: string;
  faction?: string;
  categoryLabel?: string;
  rarity?: string;
  element?: string;
}

interface CylindricalRibbonGalleryProps {
  cards: RibbonCardItem[];
  categoryTitle?: string;
  speed?: number;
  scale?: number;
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function CylindricalRibbonGallery({
  cards,
  categoryTitle = 'Chibi Tiên Cảnh',
  speed = 1,
  scale = 1,
}: CylindricalRibbonGalleryProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCard, setHoveredCard] = useState<RibbonCardItem | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // References for Three.js state
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    ribbonGroup: THREE.Group | null;
    panels: Array<{
      mesh: THREE.Mesh;
      card: RibbonCardItem;
      baseY: number;
      baseAngle: number;
      material: THREE.MeshStandardMaterial;
    }>;
    rafId: number;
    lastTime: number;
    rotY: number;
    rotX: number;
    targetRotY: number;
    targetRotX: number;
    isPointerDown: boolean;
    pointerStartX: number;
    pointerStartY: number;
    pointerMoved: boolean;
    raycaster: THREE.Raycaster;
    pointerPos: THREE.Vector2;
    isVisible: boolean;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    ribbonGroup: null,
    panels: [],
    rafId: 0,
    lastTime: performance.now(),
    rotY: 0,
    rotX: 0,
    targetRotY: 0,
    targetRotX: 0,
    isPointerDown: false,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerMoved: false,
    raycaster: new THREE.Raycaster(),
    pointerPos: new THREE.Vector2(-999, -999),
    isVisible: true,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || cards.length === 0) return;

    const S = threeRef.current;

    // Dimensions
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    S.scene = scene;

    // 2. Camera - 35-degree FOV per specification
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 80);
    const isMobile = width < 640;
    camera.position.set(0, 0, isMobile ? 11.5 : 8.8);
    camera.lookAt(0, 0, 0);
    S.camera = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    S.renderer = renderer;

    // 4. Lighting for Curved Panels & Celestial Atmosphere
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLightTop = new THREE.DirectionalLight(0xffe6c2, 2.0);
    dirLightTop.position.set(3, 8, 6);
    scene.add(dirLightTop);

    const dirLightCyan = new THREE.DirectionalLight(0x87dff6, 1.4);
    dirLightCyan.position.set(-6, -2, 4);
    scene.add(dirLightCyan);

    const centerGlow = new THREE.PointLight(0xefc16d, 1.8, 12);
    centerGlow.position.set(0, 0, 0);
    scene.add(centerGlow);

    // 5. Cylindrical Ribbon Rail & 16 Curved Panels
    const ribbonGroup = new THREE.Group();
    ribbonGroup.scale.setScalar(scale);
    scene.add(ribbonGroup);
    S.ribbonGroup = ribbonGroup;

    // Radius of cylinder rail & 4-turn placement
    const radius = isMobile ? 3.0 : 3.4;
    const totalPanels = 16;
    const totalHeight = isMobile ? 4.8 : 4.4;
    const panelHeight = isMobile ? 1.65 : 1.85;
    const panelArc = 0.38; // Radians curvature of each cylindrical card panel
    const radialSegments = 16;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = [];
    const panelMaterials: THREE.MeshStandardMaterial[] = [];
    const panelGeometries: THREE.BufferGeometry[] = [];

    // Helper fallback texture
    const cardItems: RibbonCardItem[] = [];
    for (let i = 0; i < totalPanels; i++) {
      cardItems.push(cards[i % cards.length]);
    }

    S.panels = [];

    cardItems.forEach((card, i) => {
      // 4-turn helical distribution over 16 panels: angle theta = i * (4 * 2PI / 16) = i * PI/2
      const angle = i * (Math.PI * 0.5);
      const progress = i / (totalPanels - 1);
      const y = (progress - 0.5) * totalHeight;

      // Create curved cylindrical panel geometry
      const panelGeom = new THREE.CylinderGeometry(
        radius,
        radius,
        panelHeight,
        radialSegments,
        1,
        true,
        -panelArc * 0.5,
        panelArc
      );
      panelGeometries.push(panelGeom);

      // Load card texture
      const texture = textureLoader.load(card.image || '/assets/card-back.svg');
      texture.colorSpace = THREE.SRGBColorSpace;
      loadedTextures.push(texture);

      const panelMat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.25,
        metalness: 0.15,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0.2,
      });
      panelMaterials.push(panelMat);

      const panelMesh = new THREE.Mesh(panelGeom, panelMat);
      panelMesh.position.set(0, y, 0);
      panelMesh.rotation.y = angle;
      panelMesh.userData = { cardIndex: i, card };

      ribbonGroup.add(panelMesh);

      S.panels.push({
        mesh: panelMesh,
        card,
        baseY: y,
        baseAngle: angle,
        material: panelMat,
      });
    });

    // 6. Central Celestial Energy Rings & Vertical Rail
    const railGeom = new THREE.CylinderGeometry(radius * 0.98, radius * 0.98, totalHeight * 1.35, 32, 1, true);
    const railMat = new THREE.MeshBasicMaterial({
      color: 0x87dff6,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const railMesh = new THREE.Mesh(railGeom, railMat);
    panelGeometries.push(railGeom);
    panelMaterials.push(railMat as any);
    ribbonGroup.add(railMesh);

    // 7. Animation Loop with 4-turn placement, rotation, and vertical drift
    let currentHoveredMesh: THREE.Mesh | null = null;

    function animate(time: number) {
      S.rafId = requestAnimationFrame(animate);
      if (!S.isVisible) return;

      const delta = Math.min((time - S.lastTime) / 1000, 0.05);
      S.lastTime = time;

      // Auto-rotation & Inertia
      if (!S.isPointerDown) {
        S.targetRotY += speed * delta * 0.24;
        S.targetRotX *= 0.94; // Spring back tilt to center
      }

      // Smooth damping
      S.rotY += (S.targetRotY - S.rotY) * (delta * 6);
      S.rotX += (S.targetRotX - S.rotX) * (delta * 6);

      ribbonGroup.rotation.y = S.rotY;
      ribbonGroup.rotation.x = S.rotX;

      // Authored vertical subtle drift
      ribbonGroup.position.y = Math.sin(time * 0.0012) * 0.14;

      // Raycasting for interactive panel hover
      S.raycaster.setFromCamera(S.pointerPos, camera);
      const intersects = S.raycaster.intersectObjects(
        S.panels.map(p => p.mesh),
        false
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit !== currentHoveredMesh) {
          if (currentHoveredMesh) {
            const prevP = S.panels.find(p => p.mesh === currentHoveredMesh);
            if (prevP) {
              prevP.material.emissive.setHex(0x000000);
              prevP.mesh.scale.setScalar(1);
            }
          }
          currentHoveredMesh = hit;
          const panel = S.panels.find(p => p.mesh === hit);
          if (panel) {
            panel.material.emissive.setHex(0x3eaeba);
            panel.material.emissiveIntensity = 0.45;
            panel.mesh.scale.setScalar(1.06);
            setHoveredCard(panel.card);
          }
        }
      } else {
        if (currentHoveredMesh) {
          const prevP = S.panels.find(p => p.mesh === currentHoveredMesh);
          if (prevP) {
            prevP.material.emissive.setHex(0x000000);
            prevP.mesh.scale.setScalar(1);
          }
          currentHoveredMesh = null;
          setHoveredCard(null);
        }
      }

      renderer.render(scene, camera);
    }

    S.rafId = requestAnimationFrame(animate);

    // 8. Event Handlers & Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 520;
      const isNarrow = width < 640;
      camera.aspect = width / height;
      camera.position.z = isNarrow ? 11.5 : 8.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // IntersectionObserver to pause rendering when not in viewport (saves battery on mobile)
    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          S.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Pointer Interaction (Mouse + Touch Drag)
    const onPointerDown = (clientX: number, clientY: number) => {
      S.isPointerDown = true;
      S.pointerStartX = clientX;
      S.pointerStartY = clientY;
      S.pointerMoved = false;
      setIsInteracting(true);
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      S.pointerPos.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      S.pointerPos.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (S.isPointerDown) {
        const dx = clientX - S.pointerStartX;
        const dy = clientY - S.pointerStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          S.pointerMoved = true;
        }
        S.targetRotY += dx * 0.006;
        S.targetRotX = THREE.MathUtils.clamp(S.targetRotX + dy * 0.003, -0.35, 0.35);
        S.pointerStartX = clientX;
        S.pointerStartY = clientY;
      }
    };

    const onPointerUp = () => {
      S.isPointerDown = false;
      setIsInteracting(false);
      setTimeout(() => {
        S.pointerMoved = false;
      }, 50);
    };

    const handleClick = () => {
      if (S.pointerMoved) return;
      if (currentHoveredMesh) {
        const panel = S.panels.find(p => p.mesh === currentHoveredMesh);
        if (panel) {
          router.push(`/cards/${toSlug(panel.card.coreName)}`);
        }
      }
    };

    // Canvas listeners
    const onMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const onMouseUp = () => onPointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => onPointerUp();

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    canvas.addEventListener('click', handleClick);

    // 9. Clean Disposal on Component Teardown
    return () => {
      cancelAnimationFrame(S.rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('click', handleClick);

      panelGeometries.forEach(g => g.dispose());
      panelMaterials.forEach(m => m.dispose());
      loadedTextures.forEach(t => t.dispose());

      renderer.dispose();
    };
  }, [cards, router, scale, speed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] rounded-3xl overflow-hidden bg-[#0a0d16]/90 border border-white/10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_0_60px_rgba(70,148,209,0.1)] flex flex-col justify-between p-4 sm:p-6 select-none group"
    >
      {/* Background Celestial Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-[#e6007e]/10 to-transparent blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Header & Indicator */}
      <div className="relative z-10 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#e6007e] to-[#4694d1] flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Sparkles size={16} className="text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>VÒNG TRỤ 3D · CÙNG NHÓM {categoryTitle}</span>
            </h3>
            <p className="text-[11px] font-bold text-white/50">
              16 phiến thẻ xoay 360° theo quỹ đạo trụ · Vuốt để xoay, bấm để soi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold text-[#87dff6] bg-cyan-500/10 border border-cyan-400/20 flex items-center gap-1.5">
            <RotateCw size={11} className={isInteracting ? '' : 'animate-spin'} />
            <span>{isInteracting ? 'ĐANG ĐIỀU KHIỂN' : 'TỰ ĐỘNG XOAY'}</span>
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Shell */}
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />
      </div>

      {/* Bottom Floating Hover Card Info Badge */}
      <div className="relative z-10 flex items-center justify-between gap-4 pointer-events-none">
        {hoveredCard ? (
          <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(70,148,209,0.3)] animate-fadeIn">
            <div className="w-9 h-12 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
              <img
                src={hoveredCard.image}
                alt={hoveredCard.coreName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-[#87dff6] uppercase tracking-wider">
                {hoveredCard.faction || categoryTitle}
              </div>
              <div className="text-sm font-black text-white flex items-center gap-1.5">
                <span>{hoveredCard.coreName}</span>
                <span className="text-[10px] text-pink-400 font-bold">(Bấm để xem)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[11px] font-bold text-white/40 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Compass size={13} className="text-[#87dff6]" />
            <span>Kéo chuột hoặc ngón tay để xoay vòng trụ 3D</span>
          </div>
        )}

        <button
          onClick={() => router.push('/?gallery=open')}
          className="pointer-events-auto px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white text-xs font-extrabold transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
        >
          <Eye size={14} />
          <span>Mở toàn bộ ({cards.length}+ thẻ)</span>
        </button>
      </div>
    </div>
  );
}
