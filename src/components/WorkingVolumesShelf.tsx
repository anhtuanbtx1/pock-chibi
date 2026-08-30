'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Layers, Sparkles, ExternalLink, RotateCcw, Compass, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';
import TarotBookPopup, { MainTab } from './TarotBookPopup';
import CelestialYinYangBackground from './CelestialYinYangBackground';

export interface CardItemData {
  id: string;
  name: string;
  title: string;
  category: string;
  categoryLabel: string;
  faction: string;
  image: string;
  meaning: string;
  rarity: string;
  element: string;
  slug: string;
  tabName: MainTab;
  color: string;
  foil: string;
  paletteLabel: string;
  width: number;
  height: number;
  depth: number;
}

export const FEATURED_3D_CARDS: CardItemData[] = [
  {
    id: "TD-01",
    name: "Tôn Ngộ Không",
    title: "Tề Thiên Đại Thánh - Đấu Chiến Thắng Phật",
    category: "tay_du",
    categoryLabel: "Tây Du & Minh Giới",
    faction: "Thầy Trò Đường Tăng",
    image: "/assets/ton-ngo-khong.webp",
    meaning: "Thần hầu sinh ra từ linh thạch, 72 phép biến hóa, cân đẩu vân vạn dặm, Như Ý Kim Cô Bổng quét sạch yêu ma tam giới.",
    rarity: "Chí Tôn Thần Hầu",
    element: "Kim Cang Bất Hoại",
    slug: "ton-ngo-khong",
    tabName: "TÂY DU & MINH GIỚI",
    color: "#b93816",
    foil: "#efc16d",
    paletteLabel: "Hỏa Diệm · Hoàng Kim · Xích Kim",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "TT-01",
    name: "Nguyên Thủy Thiên Tôn",
    title: "Tam Thanh Chi Thủ - Ngọc Thanh",
    category: "than_gioi",
    categoryLabel: "Thần Thoại & Tiên Giới",
    faction: "Tam Thanh Đạo Tổ",
    image: "/assets/nguyen-thuy-thien-ton.webp",
    meaning: "Bậc chí tôn khai sáng Đạo giáo ngự Côn Lôn Ngọc Hư Cung, nắm giữ Bàn Cổ Phiên chấn nhiếp chư thiên vạn giới.",
    rarity: "Chí Tôn Thần Thoại",
    element: "Hỗn Độn Chi Khí",
    slug: "nguyen-thuy-thien-ton",
    tabName: "THẦN THOẠI & TIÊN GIỚI",
    color: "#16348c",
    foil: "#efc16d",
    paletteLabel: "Cửu Trùng Lam · Kim Quang · Bạch Ngọc",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "VN-01",
    name: "Lạc Long Quân",
    title: "Quốc Tổ Rồng Tiên - Bách Việt Thủy Tổ",
    category: "viet_nam",
    categoryLabel: "Thần Thoại & Hào Kiệt Việt Nam",
    faction: "Bách Việt Hồng Bàng",
    image: "/assets/lac-long-quan-chibi-3d.webp",
    meaning: "Quốc Tổ mang dòng máu rồng biển Đông, diệt trừ Ngư Tinh, Hồ Tinh, Mộc Tinh mở mang cõi bờ cho trăm người con Lạc Hồng.",
    rarity: "Chí Tôn Quốc Tổ",
    element: "Cửu Long Thủy Khí",
    slug: "lac-long-quan",
    tabName: "THẦN THOẠI VIỆT NAM",
    color: "#182a43",
    foil: "#c87046",
    paletteLabel: "Đông Hải Lam · Đồng Thau · Lạc Hồng",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "VN-02",
    name: "Âu Cơ",
    title: "Quốc Mẫu Tiên Nữ - Bách Việt Thánh Mẫu",
    category: "viet_nam",
    categoryLabel: "Thần Thoại & Hào Kiệt Việt Nam",
    faction: "Bách Việt Hồng Bàng",
    image: "/assets/au-co-chibi-3d.webp",
    meaning: "Quốc Mẫu dòng dõi tiên trên núi cao, hạ sinh bọc trăm trứng nở trăm người con khởi nguồn nòi giống Tiên Rồng Đại Việt.",
    rarity: "Chí Tôn Quốc Mẫu",
    element: "Tiên Thiên Linh Thú",
    slug: "au-co",
    tabName: "THẦN THOẠI VIỆT NAM",
    color: "#1b4d3e",
    foil: "#efc16d",
    paletteLabel: "Bích Ngọc · Tiên Sơn · Hoàng Kim",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "TQ-01",
    name: "Gia Cát Lượng",
    title: "Ngọa Long Tiên Sinh - Vũ Hương Hầu",
    category: "tam_quoc",
    categoryLabel: "Tam Quốc Chí",
    faction: "Thục Hán",
    image: "/assets/gia-cat-luong.webp",
    meaning: "Thừa tướng tài trí tuyệt đỉnh, mượn gió Đông, lập Bát Trận Đồ, bảy lần bắt Mạnh Hoạch cống hiến trọn đời vì Thục Hán.",
    rarity: "Chí Tôn Quân Sư",
    element: "Bát Quái Phong Lôi",
    slug: "gia-cat-luong",
    tabName: "TAM QUỐC CHÍ",
    color: "#8c1e19",
    foil: "#efc16d",
    paletteLabel: "Thục Hán Hồng · Khổng Minh · Bát Quái",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "TQ-03",
    name: "Quan Vũ",
    title: "Quan Thánh Đế Quân - Mỹ Nhiễm Công",
    category: "tam_quoc",
    categoryLabel: "Tam Quốc Chí",
    faction: "Thục Hán",
    image: "/assets/quan-vu.webp",
    meaning: "Đứng đầu Ngũ Hổ Tướng, chém Nhan Lương trảm Văn Xú, qua năm ải chém sáu tướng, biểu tượng bất diệt của lòng trung nghĩa.",
    rarity: "Chí Tôn Võ Thánh",
    element: "Thanh Long Yển Nguyệt",
    slug: "quan-vu",
    tabName: "TAM QUỐC CHÍ",
    color: "#284e3a",
    foil: "#efc16d",
    paletteLabel: "Thanh Long Lục · Xích Thố · Võ Thánh",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "KD-01",
    name: "Độc Cô Cầu Bại",
    title: "Kiếm Ma Vô Địch - Thiên Hạ Vô Địch Thủ",
    category: "kim_dung",
    categoryLabel: "Võ Lâm Kim Dung",
    faction: "Kiếm Đạo Đỉnh Phong",
    image: "/assets/doc-co-cau-bai.webp",
    meaning: "Tung hoành giang hồ hơn ba mươi năm không tìm nổi đối thủ xứng tầm, sáng tạo Độc Cô Cửu Kiếm đạt cảnh giới vô chiêu thắng hữu chiêu.",
    rarity: "Chí Tôn Kiếm Thánh",
    element: "Độc Cô Cửu Kiếm",
    slug: "doc-co-cau-bai",
    tabName: "VÕ LÂM KIM DUNG",
    color: "#3d265a",
    foil: "#efc16d",
    paletteLabel: "Tử Trúc · Kiếm Ma · Huyền Thiết",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "KD-02",
    name: "Trương Tam Phong",
    title: "Thái Cực Tông Sư - Võ Đang Khai Sơn Tổ Sư",
    category: "kim_dung",
    categoryLabel: "Võ Lâm Kim Dung",
    faction: "Võ Đang Phái",
    image: "/assets/truong-tam-phong-chibi-3d.webp",
    meaning: "Sống hơn trăm tuổi sáng tạo Thái Cực Quyền và Thái Cực Kiếm lấy tĩnh chế động dĩ nhu khắc cương danh chấn ngàn năm.",
    rarity: "Chí Tôn Đạo Tổ",
    element: "Thái Cực Âm Dương",
    slug: "truong-tam-phong",
    tabName: "VÕ LÂM KIM DUNG",
    color: "#214252",
    foil: "#87dff6",
    paletteLabel: "Võ Đang Lam · Thái Cực · Băng Lam",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "PV-01",
    name: "Bộ Kinh Vân",
    title: "Bất Khốc Tử Thần - Tuyệt Thế Hảo Kiếm",
    category: "phong_van",
    categoryLabel: "Phong Vân & Võ Thuật",
    faction: "Phong Vân Truyền Kỳ",
    image: "/assets/bo-kinh-van.webp",
    meaning: "Bất Khốc Tử Thần mang Kỳ Lân Tí cùng Tuyệt Thế Hảo Kiếm, Bài Vân Chưởng dời non lấp biển định đoạn càn khôn.",
    rarity: "Chí Tôn Thần Ma",
    element: "Bài Vân Hảo Kiếm",
    slug: "bo-kinh-van",
    tabName: "PHONG VÂN & VÕ THUẬT",
    color: "#1c2b36",
    foil: "#dbe8f1",
    paletteLabel: "Tử Thần Hắc · Tuyệt Thế · Băng Ngân",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  },
  {
    id: "PV-10",
    name: "Lý Tiểu Long",
    title: "Triệt Quyền Đạo Sáng Tổ - Huyền Thoại Võ Thuật",
    category: "phong_van",
    categoryLabel: "Phong Vân & Võ Thuật",
    faction: "Võ Thuật Tông Sư",
    image: "/assets/ly-tieu-long-chibi-3d-vang.webp",
    meaning: "Huyền thoại võ thuật toàn cầu, sáng tạo Triệt Quyền Đạo và biểu tượng côn nhị khúc đưa võ thuật châu Á rực sáng khắp năm châu.",
    rarity: "Chí Tôn Huyền Thoại",
    element: "Triệt Quyền Vô Hạn",
    slug: "ly-tieu-long",
    tabName: "PHONG VÂN & VÕ THUẬT",
    color: "#b08514",
    foil: "#ffffff",
    paletteLabel: "Hoàng Kim · Triệt Quyền · Long Hống",
    width: 1.15,
    height: 1.62,
    depth: 0.04
  }
];

export default function WorkingVolumesShelf() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerLabelRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const inspectButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const flipCardButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  // Gallery Popup Modal State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<MainTab>('SEE ALL');

  // React state for UI
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<'hero' | 'opening' | 'detail' | 'closing'>('hero');
  const [cardFlipped, setCardFlipped] = useState(false);

  // References for 3D loop state
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    controls: null as OrbitControls | null,
    shelfStage: null as THREE.Group | null,
    cardRigs: [] as any[],
    hitTargets: [] as THREE.Mesh[],
    rafId: 0,
    lastTime: performance.now(),
    position: 0,
    targetPosition: 0,
    hoveredIndex: -1,
    transitionTime: 0,
    mode: 'hero' as 'hero' | 'opening' | 'detail' | 'closing',
    selectedIndex: 0,
    cardFlipped: false,
    autoScroll: true,
    isInteracting: false,
    interactionTimer: null as any,
    viewWidth: 1200,
    viewHeight: 800,
    activeCard: null as any,
    vectors: {
      shelfCameraPosition: new THREE.Vector3(0, 1.55, 6.4),
      shelfCameraTarget: new THREE.Vector3(0, 1.25, 0),
      inspectPosition: new THREE.Vector3(-1.85, 1.35, 0.4),
      inspectCameraPosition: new THREE.Vector3(-0.35, 1.45, 4.4),
      inspectCameraTarget: new THREE.Vector3(-1.85, 1.35, 0.4),
      transitionCameraTarget: new THREE.Vector3(),
      openingCardPosition: new THREE.Vector3(),
      openingCardQuaternion: new THREE.Quaternion(),
      openingCardScale: new THREE.Vector3(),
      openingCameraPosition: new THREE.Vector3(),
      openingCameraTarget: new THREE.Vector3(),
      openingShelfPosition: new THREE.Vector3(),
      inspectShelfPosition: new THREE.Vector3(0, -4.5, -3),
      inspectCardQuaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(0.04, -0.15, 0)),
      closingCardPosition: new THREE.Vector3(),
      closingCardStartPosition: new THREE.Vector3(),
      closingCardStartQuaternion: new THREE.Quaternion(),
      closingCardStartScale: new THREE.Vector3(),
      closingCardQuaternion: new THREE.Quaternion(),
      closingCameraPosition: new THREE.Vector3(),
      closingCameraTarget: new THREE.Vector3(),
      closingShelfPosition: new THREE.Vector3(),
      shelfRestPosition: new THREE.Vector3(0, 0, 0),
    }
  });

  const clamp = THREE.MathUtils.clamp;
  const damp = THREE.MathUtils.damp;
  const lerp = THREE.MathUtils.lerp;
  const smoothstep = (v: number) => v * v * (3 - 2 * v);
  const smootherstep = (v: number) => v * v * v * (v * (v * 6 - 15) + 10);
  const mod = (v: number, len: number) => ((v % len) + len) % len;
  const pad = (v: number) => String(v).padStart(2, '0');

  const openGalleryForTab = useCallback((tabName: MainTab) => {
    setGalleryTab(tabName);
    setGalleryOpen(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const S = stateRef.current;
    const spacing = 1.75;
    const shelfBoardTop = 0.38;
    const DETAIL_TRANSITION_DURATION = 0.85;
    const SHELF_TRANSITION_DURATION = 0.85;

    const textureLoader = new THREE.TextureLoader();

    // Generate Card Back Texture (Bagua / Celestial seal)
    function makeCardBackTexture() {
      const cv = document.createElement("canvas");
      cv.width = 768;
      cv.height = 1080;
      const ctx = cv.getContext("2d")!;

      ctx.fillStyle = "#0c1524";
      ctx.fillRect(0, 0, cv.width, cv.height);

      // Gold and Cyan Frames
      ctx.strokeStyle = "#4694d1";
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, cv.width - 40, cv.height - 40);
      ctx.strokeStyle = "#efc16d";
      ctx.lineWidth = 3;
      ctx.strokeRect(32, 32, cv.width - 64, cv.height - 64);

      const cx = cv.width / 2;
      const cy = cv.height / 2;

      // Outer Runes Circle
      ctx.strokeStyle = "rgba(135, 223, 246, 0.5)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 190, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(239, 193, 109, 0.7)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 145, 0, Math.PI * 2);
      ctx.stroke();

      // Yin Yang Emblem
      ctx.fillStyle = "#87dff6";
      ctx.beginPath();
      ctx.arc(cx, cy, 100, -Math.PI / 2, Math.PI / 2);
      ctx.arc(cx, cy + 50, 50, Math.PI / 2, -Math.PI / 2);
      ctx.arc(cx, cy - 50, 50, Math.PI / 2, -Math.PI / 2, true);
      ctx.fill();

      ctx.fillStyle = "#09121e";
      ctx.beginPath();
      ctx.arc(cx, cy, 100, Math.PI / 2, -Math.PI / 2);
      ctx.arc(cx, cy - 50, 50, -Math.PI / 2, Math.PI / 2);
      ctx.arc(cx, cy + 50, 50, -Math.PI / 2, Math.PI / 2, true);
      ctx.fill();

      ctx.fillStyle = "#09121e";
      ctx.beginPath();
      ctx.arc(cx, cy - 50, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#87dff6";
      ctx.beginPath();
      ctx.arc(cx, cy + 50, 18, 0, Math.PI * 2);
      ctx.fill();

      // Text Header
      ctx.fillStyle = "#efc16d";
      ctx.textAlign = "center";
      ctx.font = '800 28px Kanit, sans-serif';
      ctx.fillText("POCK CHIBI 3D", cx, 130);
      ctx.fillStyle = "#87dff6";
      ctx.font = '700 16px "Iowan Old Style", serif';
      ctx.fillText("THẦN THOẠI & VÕ LÂM TIÊN CẢNH", cx, 165);

      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = '600 14px Kanit, sans-serif';
      ctx.fillText("★ TRADING CARD GAME OFFICIAL ★", cx, cv.height - 90);

      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.generateMipmaps = true;
      return tex;
    }

    const cardBackTexture = makeCardBackTexture();

    // Create 3D Card Rig
    function createCardRig(card: CardItemData, index: number) {
      const root = new THREE.Group();
      root.name = `card-${card.id}`;
      root.userData.index = index;

      const motion = new THREE.Group();
      root.add(motion);

      const width = card.width;
      const height = card.height;
      const depth = card.depth;

      // Load character illustration texture
      const frontTexture = textureLoader.load(card.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.needsUpdate = true;
      });

      // Front Face Material (Illustration)
      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.3,
        metalness: 0.08,
        transparent: true,
      });

      // Back Face Material (Bagua Yin-Yang)
      const backMat = new THREE.MeshStandardMaterial({
        map: cardBackTexture,
        roughness: 0.35,
        metalness: 0.12,
        transparent: true,
      });

      // Metallic Foil Rim Material
      const edgeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(card.foil),
        roughness: 0.22,
        metalness: 0.88,
        transparent: true,
      });

      // Card Slab Body (Thickness)
      const slabGeo = new THREE.BoxGeometry(width, height, depth);
      const cardSlab = new THREE.Mesh(slabGeo, edgeMat);
      motion.add(cardSlab);

      // Front Plane (Character Illustration)
      const frontPlaneGeo = new THREE.PlaneGeometry(width - 0.008, height - 0.008);
      const frontMesh = new THREE.Mesh(frontPlaneGeo, frontMat);
      frontMesh.position.z = depth * 0.5 + 0.003;
      motion.add(frontMesh);

      // Back Plane (Bagua Rune)
      const backMesh = new THREE.Mesh(frontPlaneGeo, backMat);
      backMesh.position.z = -depth * 0.5 - 0.003;
      backMesh.rotation.y = Math.PI;
      motion.add(backMesh);

      // Hit Target Box
      const hit = new THREE.Mesh(
        new THREE.BoxGeometry(width * 1.25, height * 1.15, 0.8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
      );
      hit.position.set(0, 0, 0.1);
      hit.userData.index = index;
      motion.add(hit);
      S.hitTargets.push(hit);

      return {
        data: card,
        root,
        motion,
        hit,
        opacity: 1,
        fadeMaterials: [frontMat, backMat, edgeMat],
        base: { width, height, depth }
      };
    }

    function configureResponsiveTargets() {
      const isMobile = S.viewWidth < 640;
      const narrow = S.viewWidth < 880;

      if (isMobile) {
        // Mobile screens (portrait phones)
        S.vectors.shelfCameraPosition.set(0, 1.48, 8.2);
        S.vectors.shelfCameraTarget.set(0, 1.25, 0);
        S.vectors.inspectPosition.set(0, 1.95, 0.4);
        S.vectors.inspectCameraPosition.set(0, 1.95, 4.2);
      } else if (narrow) {
        // Tablets
        S.vectors.shelfCameraPosition.set(0, 1.55, 7.4);
        S.vectors.shelfCameraTarget.set(0, 1.25, 0);
        S.vectors.inspectPosition.set(0, 1.7, 0.4);
        S.vectors.inspectCameraPosition.set(0, 1.7, 4.4);
      } else {
        // Desktop
        S.vectors.shelfCameraPosition.set(0, 1.55, 6.4);
        S.vectors.shelfCameraTarget.set(0, 1.25, 0);
        S.vectors.inspectPosition.set(-1.85, 1.35, 0.4);
        S.vectors.inspectCameraPosition.set(-0.35, 1.45, 4.4);
      }
      S.vectors.inspectCameraTarget.copy(S.vectors.inspectPosition);
    }

    // Initialize Three.js WebGL
    S.viewWidth = window.innerWidth;
    S.viewHeight = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0); // Pure transparent for background
    renderer.setSize(S.viewWidth, S.viewHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, S.viewWidth < 820 ? 1.5 : 2));
    S.renderer = renderer;

    const scene = new THREE.Scene();
    S.scene = scene;

    const camera = new THREE.PerspectiveCamera(34, S.viewWidth / S.viewHeight, 0.1, 80);
    S.camera = camera;

    const shelfStage = new THREE.Group();
    scene.add(shelfStage);
    S.shelfStage = shelfStage;

    configureResponsiveTargets();
    camera.position.copy(S.vectors.shelfCameraPosition);
    camera.lookAt(S.vectors.shelfCameraTarget);

    const controls = new OrbitControls(camera, canvas);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.minDistance = 2.5;
    controls.maxDistance = 6.8;
    controls.target.copy(S.vectors.shelfCameraTarget);
    S.controls = controls;

    // Direct High-Vibrancy Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(2.5, 7.0, 7.5);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x87dff6, 1.2);
    cyanRim.position.set(-5.0, 3.5, 4.5);
    scene.add(cyanRim);

    const goldFill = new THREE.PointLight(0xefc16d, 1.6, 12);
    goldFill.position.set(0, 1.5, 3.5);
    scene.add(goldFill);

    // Build Featured 3D Card Rigs
    S.cardRigs = FEATURED_3D_CARDS.map((card, index) => {
      const rig = createCardRig(card, index);
      shelfStage.add(rig.root);
      return rig;
    });

    // Theme update: KEEP FIXED DARK PALETTE
    function updateSelectionTheme(idx: number) {
      const nextIdx = mod(idx, FEATURED_3D_CARDS.length);
      S.selectedIndex = nextIdx;
      setSelectedIndex(nextIdx);
      const card = FEATURED_3D_CARDS[nextIdx];

      const rootStyle = document.documentElement.style;
      rootStyle.setProperty("--accent", card.foil);
      rootStyle.setProperty("--ink", "#f4eee6");
      rootStyle.setProperty("--ink-soft", "#a8b8d0");
    }

    updateSelectionTheme(0);

    // Animation Loop with Smooth 60fps Auto-Scroll
    function animate(time: number) {
      S.rafId = requestAnimationFrame(animate);
      const delta = Math.min((time - S.lastTime) / 1000, 0.05);
      S.lastTime = time;

      if (S.mode === 'hero') {
        // Continuous smooth auto-scroll when not actively interacting
        if (S.autoScroll && !S.isInteracting && S.hoveredIndex === -1) {
          S.targetPosition += delta * 0.38; // Buttery smooth glide
        }

        S.position = damp(S.position, S.targetPosition, 8.5, delta);
        if (Math.abs(S.position - S.targetPosition) < 0.0005) S.position = S.targetPosition;

        const nearest = mod(Math.round(S.position), FEATURED_3D_CARDS.length);
        if (nearest !== S.selectedIndex) updateSelectionTheme(nearest);

        S.cardRigs.forEach((rig, index) => {
          if (rig.root.parent !== shelfStage) return;
          let offset = index - S.position;
          offset -= Math.round(offset / FEATURED_3D_CARDS.length) * FEATURED_3D_CARDS.length;
          const distance = Math.abs(offset);
          const focus = Math.max(0, 1 - distance * 0.95);
          const targetX = offset * spacing;
          const targetY = shelfBoardTop + rig.base.height * 0.5 + focus * 0.12;
          const targetZ = 0.12 + focus * 0.32 - Math.min(distance, 3.5) * 0.08;
          const targetScale = 1 + focus * 0.14;

          // Directly set position, rotation, and scale from smoothly damped S.position
          rig.root.position.set(targetX, targetY, targetZ);
          rig.root.rotation.y = -offset * 0.08;
          rig.root.scale.setScalar(targetScale);

          // Soft fade out for cards at the edges, 0 opacity when wrapping
          const fadeProgress = clamp((distance - 2.6) / 0.8, 0, 1);
          rig.opacity = 1 - smoothstep(fadeProgress);
          rig.fadeMaterials.forEach((m: any) => {
            if (m) {
              m.opacity = rig.opacity;
            }
          });
        });

        camera.position.copy(S.vectors.shelfCameraPosition);
        camera.lookAt(S.vectors.shelfCameraTarget);
      } else if (S.mode === 'opening') {
        S.transitionTime = Math.min(1, S.transitionTime + delta / DETAIL_TRANSITION_DURATION);
        const eased = smootherstep(S.transitionTime);
        S.activeCard.root.position.lerpVectors(S.vectors.openingCardPosition, S.vectors.inspectPosition, eased);
        S.activeCard.root.quaternion.slerpQuaternions(S.vectors.openingCardQuaternion, S.vectors.inspectCardQuaternion, eased);
        S.activeCard.root.scale.setScalar(lerp(1, 1.25, eased));
        shelfStage.position.lerpVectors(S.vectors.openingShelfPosition, S.vectors.inspectShelfPosition, eased);
        camera.position.lerpVectors(S.vectors.openingCameraPosition, S.vectors.inspectCameraPosition, eased);
        S.vectors.transitionCameraTarget.lerpVectors(S.vectors.openingCameraTarget, S.vectors.inspectCameraTarget, eased);
        camera.lookAt(S.vectors.transitionCameraTarget);

        if (S.transitionTime >= 1) {
          S.mode = 'detail';
          setMode('detail');
          controls.target.copy(S.vectors.inspectCameraTarget);
          controls.enabled = true;
        }
      } else if (S.mode === 'closing') {
        S.transitionTime = Math.min(1, S.transitionTime + delta / SHELF_TRANSITION_DURATION);
        const eased = smootherstep(S.transitionTime);
        shelfStage.position.lerpVectors(S.vectors.closingShelfPosition, S.vectors.shelfRestPosition, eased);
        S.activeCard.root.position.lerpVectors(S.vectors.closingCardStartPosition, S.vectors.closingCardPosition, eased);
        S.activeCard.root.quaternion.slerpQuaternions(S.vectors.closingCardStartQuaternion, S.vectors.closingCardQuaternion, eased);
        camera.position.lerpVectors(S.vectors.closingCameraPosition, S.vectors.shelfCameraPosition, eased);
        S.vectors.transitionCameraTarget.lerpVectors(S.vectors.closingCameraTarget, S.vectors.shelfCameraTarget, eased);
        camera.lookAt(S.vectors.transitionCameraTarget);

        if (S.transitionTime >= 1) {
          shelfStage.attach(S.activeCard.root);
          S.activeCard = null;
          S.mode = 'hero';
          setMode('hero');
        }
      } else if (S.mode === 'detail' && S.activeCard) {
        controls.update();
        // Smooth 180 deg Flip Card animation
        const targetRotY = S.cardFlipped ? Math.PI : 0;
        S.activeCard.motion.rotation.y = damp(S.activeCard.motion.rotation.y, targetRotY, 10, delta);
      }

      renderer.render(scene, camera);
    }

    S.rafId = requestAnimationFrame(animate);

    // Event Listeners
    const handleResize = () => {
      S.viewWidth = window.innerWidth;
      S.viewHeight = window.innerHeight;
      configureResponsiveTargets();
      renderer.setSize(S.viewWidth, S.viewHeight, false);
      camera.aspect = S.viewWidth / S.viewHeight;
      camera.updateProjectionMatrix();
    };

    const handleWheel = (e: WheelEvent) => {
      if (S.mode !== 'hero') return;
      e.preventDefault();
      S.isInteracting = true;
      if (S.interactionTimer) clearTimeout(S.interactionTimer);
      S.interactionTimer = setTimeout(() => { S.isInteracting = false; }, 3200);

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      S.targetPosition += clamp(delta * 0.002, -0.6, 0.6);
    };

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (S.mode !== 'hero') return;
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
        S.isInteracting = true;
        if (S.interactionTimer) clearTimeout(S.interactionTimer);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (S.mode !== 'hero') return;
      if (e.touches.length === 1) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = touchStartX - currentX;
        const diffY = touchStartY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 6) {
          if (e.cancelable) e.preventDefault();
          isSwiping = true;
          S.targetPosition += diffX * 0.0035;
          touchStartX = currentX;
          touchStartY = currentY;
        }
      }
    };

    const handleTouchEnd = () => {
      if (S.mode !== 'hero') return;
      if (S.interactionTimer) clearTimeout(S.interactionTimer);
      S.interactionTimer = setTimeout(() => { S.isInteracting = false; }, 3200);
      if (isSwiping) {
        S.targetPosition = Math.round(S.targetPosition);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(S.rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, []);

  // UI Handlers
  const handleNext = () => {
    const S = stateRef.current;
    if (S.mode !== 'hero') return;
    S.isInteracting = true;
    if (S.interactionTimer) clearTimeout(S.interactionTimer);
    S.interactionTimer = setTimeout(() => { S.isInteracting = false; }, 3200);
    S.targetPosition = Math.round(S.targetPosition) + 1;
  };

  const handlePrev = () => {
    const S = stateRef.current;
    if (S.mode !== 'hero') return;
    S.isInteracting = true;
    if (S.interactionTimer) clearTimeout(S.interactionTimer);
    S.interactionTimer = setTimeout(() => { S.isInteracting = false; }, 3200);
    S.targetPosition = Math.round(S.targetPosition) - 1;
  };

  const handleOpenDetail = () => {
    const S = stateRef.current;
    if (S.mode !== 'hero') return;
    S.mode = 'opening';
    setMode('opening');
    S.transitionTime = 0;
    S.cardFlipped = false;
    setCardFlipped(false);
    S.activeCard = S.cardRigs[S.selectedIndex];

    S.activeCard.root.updateWorldMatrix(true, true);
    S.activeCard.root.matrixWorld.decompose(S.vectors.openingCardPosition, S.vectors.openingCardQuaternion, S.vectors.openingCardScale);
    S.vectors.openingCameraPosition.copy(S.camera!.position);
    S.vectors.openingCameraTarget.copy(S.vectors.transitionCameraTarget);
    S.vectors.openingShelfPosition.copy(S.shelfStage!.position);
    S.scene!.add(S.activeCard.root);
    S.activeCard.root.position.copy(S.vectors.openingCardPosition);
    S.activeCard.root.quaternion.copy(S.vectors.openingCardQuaternion);
    S.activeCard.root.scale.copy(S.vectors.openingCardScale);
  };

  const handleCloseDetail = () => {
    const S = stateRef.current;
    if (S.mode !== 'detail') return;
    S.mode = 'closing';
    setMode('closing');
    S.transitionTime = 0;
    S.cardFlipped = false;
    setCardFlipped(false);
    S.controls!.enabled = false;
    S.vectors.closingCardStartPosition.copy(S.activeCard.root.position);
    S.vectors.closingCardStartQuaternion.copy(S.activeCard.root.quaternion);
    S.vectors.closingCardStartScale.copy(S.activeCard.root.scale);
    S.vectors.closingCameraPosition.copy(S.camera!.position);
    S.vectors.closingCameraTarget.copy(S.controls!.target);
    S.vectors.closingShelfPosition.copy(S.shelfStage!.position);
    S.vectors.closingCardPosition.set(0, 0.38 + S.activeCard.base.height * 0.5 + 0.12, 0.44);
  };

  const handleFlipCard = () => {
    const S = stateRef.current;
    if (S.mode !== 'detail') return;
    S.cardFlipped = !S.cardFlipped;
    setCardFlipped(S.cardFlipped);
  };

  const handleResetView = () => {
    const S = stateRef.current;
    if (S.mode !== 'detail') return;
    S.camera!.position.copy(S.vectors.inspectCameraPosition);
    S.controls!.target.copy(S.vectors.inspectCameraTarget);
    S.controls!.update();
  };

  const currentCard = FEATURED_3D_CARDS[selectedIndex] || FEATURED_3D_CARDS[0];

  return (
    <div className={`experience ${mode === 'detail' || mode === 'opening' ? 'mode-detail' : ''}`} ref={containerRef}>
      {/* Animated Yin-Yang Celestial Background */}
      <CelestialYinYangBackground />

      <div className="scene-shell">
        <canvas id="scene" ref={canvasRef} />
      </div>

      {/* Top Editorial Header */}
      <header className="editorial-header" aria-label="Bộ Sưu Tập Thẻ Bài">
        <div className="editorial-identity">
          <strong>Pock Chibi · Thư Viện Thẻ Bài 3D</strong>
          <span>Bộ Sưu Tập Thẻ Chibi Thần Thoại & Võ Lâm</span>
        </div>
        <div className="editorial-index">
          <span>Phiên Bản TCG 2026</span>
          <span id="palette-label">{currentCard.paletteLabel}</span>
        </div>
      </header>

      {/* Tooltip Label */}
      <div className="pointer-label" ref={pointerLabelRef} aria-hidden="true">
        <span>THẺ BÀI #{pad(selectedIndex + 1)}</span>
        <strong>{currentCard.name}</strong>
      </div>

      {/* Bottom Navigation UI */}
      <section className="browse-ui" id="browse-ui" aria-label="Card navigation">
        <div className="selection">
          <span className="counter" id="counter">{pad(selectedIndex + 1)} / {pad(FEATURED_3D_CARDS.length)}</span>
          <div className="selection__copy">
            <h1 className="selection__title" id="selection-title">{currentCard.name}</h1>
            <p className="selection__note" id="selection-note">{currentCard.title} · {currentCard.element}</p>
          </div>
        </div>

        <div className="browse-actions">
          <button className="round-button" id="previous" type="button" onClick={handlePrev} aria-label="Thẻ trước">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10.5 3.5-4.5 4.5 4.5 4.5"></path></svg>
          </button>
          <button className="text-button" id="inspect" type="button" ref={inspectButtonRef} onClick={handleOpenDetail}>
            SOI THẺ 3D
          </button>
          <button className="round-button" id="next" type="button" onClick={handleNext} aria-label="Thẻ kế tiếp">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5.5 3.5 4.5 4.5-4.5 4.5"></path></svg>
          </button>
        </div>

        <nav className="index-nav" aria-label="Card scroll track">
          <div className="card-scrollbar-container">
            <div
              className="card-scrollbar-track"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                stateRef.current.isInteracting = true;
                stateRef.current.targetPosition = ratio * (FEATURED_3D_CARDS.length - 1);
              }}
            >
              <div
                className="card-scrollbar-thumb"
                style={{
                  width: `${100 / FEATURED_3D_CARDS.length}%`,
                  transform: `translateX(${selectedIndex * 100}%)`,
                }}
              />
            </div>
            <div className="card-scrollbar-labels">
              <span>01</span>
              <span className="current-track-num">#{pad(selectedIndex + 1)} · {currentCard.name}</span>
              <span>{pad(FEATURED_3D_CARDS.length)}</span>
            </div>
          </div>
        </nav>
      </section>

      {/* Detail / Inspection Side Panel */}
      <aside
        className="detail-panel"
        id="detail-panel"
        ref={detailPanelRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={mode !== 'detail'}
      >
        <button className="close-button" id="close-detail" type="button" ref={closeButtonRef} onClick={handleCloseDetail} aria-label="Đặt thẻ lại lên kệ">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"></path></svg>
        </button>

        <p className="eyebrow" id="detail-eyebrow">THẺ BÀI #{pad(selectedIndex + 1)} · {currentCard.faction}</p>
        <h2 className="detail-title" id="detail-title">{currentCard.name}</h2>
        <p className="detail-deck" id="detail-deck">{currentCard.meaning}</p>

        <dl className="meta-list">
          <div>
            <dt>Độ hiếm thẻ</dt>
            <dd id="detail-binding">{currentCard.rarity}</dd>
          </div>
          <div>
            <dt>Công pháp / Thần binh</dt>
            <dd id="detail-format">{currentCard.element}</dd>
          </div>
          <div>
            <dt>Môn phái / Thế lực</dt>
            <dd id="detail-theme">{currentCard.faction}</dd>
          </div>
          <div>
            <dt>Giới vực</dt>
            <dd id="detail-motif">{currentCard.categoryLabel}</dd>
          </div>
        </dl>

        <div className="detail-controls">
          <p className="microcopy">Xoay mặt thẻ · Rê chuột xoay góc nhìn 3D</p>
          <div className="detail-buttons">
            {/* Link directly to dedicated card detail page */}
            <Link
              href={`/cards/${currentCard.slug}`}
              className="explore-collection-button"
            >
              <span>Xem Profile Thẻ</span>
              <ExternalLink size={15} />
            </Link>

            <button
              className="text-button reset-button"
              type="button"
              onClick={() => openGalleryForTab(currentCard.tabName)}
            >
              <Layers size={15} className="inline-block mr-1.5" />
              <span>Thư Viện 120+ Thẻ</span>
            </button>

            <button className="text-button reset-button" type="button" ref={flipCardButtonRef} onClick={handleFlipCard}>
              <RotateCcw size={15} className="inline-block mr-1.5" />
              {cardFlipped ? "Mặt trước" : "Mặt sau"}
            </button>

            <button className="text-button reset-button" type="button" ref={resetButtonRef} onClick={handleResetView}>
              Góc chuẩn
            </button>
          </div>
        </div>
      </aside>

      <div className="sr-only" id="live-region" aria-live="polite"></div>

      {/* 2D Full Card Gallery Modal Integration */}
      <TarotBookPopup
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialTab={galleryTab}
      />
    </div>
  );
}
