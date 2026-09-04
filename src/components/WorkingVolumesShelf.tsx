'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Layers, Sparkles, ExternalLink, RotateCcw, Compass, ArrowLeft, ArrowRight, Eye, Play, Pause, Shuffle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import TarotBookPopup, { MainTab } from './TarotBookPopup';
import CelestialYinYangBackground from './CelestialYinYangBackground';
import allChibiData from '@/data/chibi/all_chibi.json';

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

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const FACTION_PALETTES: Record<string, { color: string; foil: string; paletteLabel: string }> = {
  "Tam Thanh Đạo Tổ": { color: "#16348c", foil: "#efc16d", paletteLabel: "Cửu Trùng Lam · Kim Quang · Bạch Ngọc" },
  "Tây Phương Cực Lạc": { color: "#7a4b08", foil: "#ffd700", paletteLabel: "Phật Quang · Hoàng Kim · Vạn Tự" },
  "Thiên Đình": { color: "#251b5c", foil: "#efc16d", paletteLabel: "Tử Khí · Hoàng Cực · Kim Loan" },
  "Thầy Trò Đường Tăng": { color: "#b93816", foil: "#efc16d", paletteLabel: "Hỏa Diệm · Hoàng Kim · Xích Kim" },
  "Bách Việt Hồng Bàng": { color: "#182a43", foil: "#c87046", paletteLabel: "Đông Hải Lam · Đồng Thau · Lạc Hồng" },
  "Thục Hán": { color: "#8c1e19", foil: "#efc16d", paletteLabel: "Thục Hán Hồng · Khổng Minh · Bát Quái" },
  "Tào Ngụy": { color: "#1c2b36", foil: "#4694d1", paletteLabel: "Ngụy Quốc Lam · Kiêu Hùng · Băng Ngân" },
  "Đông Ngô": { color: "#1a4731", foil: "#efc16d", paletteLabel: "Giang Đông Lục · Chu Lang · Hỏa Thiêu" },
  "Võ Đang Phái": { color: "#214252", foil: "#87dff6", paletteLabel: "Võ Đang Lam · Thái Cực · Băng Lam" },
  "Kiếm Đạo Đỉnh Phong": { color: "#3d265a", foil: "#efc16d", paletteLabel: "Tử Trúc · Kiếm Ma · Huyền Thiết" },
  "Phong Vân Truyền Kỳ": { color: "#1c2b36", foil: "#dbe8f1", paletteLabel: "Tử Thần Hắc · Tuyệt Thế · Băng Ngân" },
  "Võ Thuật Tông Sư": { color: "#b08514", foil: "#ffffff", paletteLabel: "Hoàng Kim · Triệt Quyền · Long Hống" },
  "Cenation Universe": { color: "#0d2b5c", foil: "#f97316", paletteLabel: "Cenation Lam · Bất Diệt · Cam Hỏa" },
  "Lucha Libre World": { color: "#2d164d", foil: "#eab308", paletteLabel: "Lucha Tử Kim · 619 · Hoàng Kim" },
  "Evolution · Animal Unleashed": { color: "#421010", foil: "#ef4444", paletteLabel: "Mãnh Thú Huyết Hắc · Cuồng Nộ" },
  "The Rattlesnake · Attitude Era": { color: "#1a1a1a", foil: "#e2e8f0", paletteLabel: "Bạch Ngân · Xà Vương · Austin 3:16" },
  "D-Generation X · The Authority": { color: "#0f2e16", foil: "#22c55e", paletteLabel: "Lục Bảo · The Game · King of Kings" },
  "ECW Originals · RVD 4:20": { color: "#14291e", foil: "#4ade80", paletteLabel: "Lục Hỏa · Frog Splash · Hardcore" },
  "Phương Thốn Tiên Sơn": { color: "#1e293b", foil: "#38bdf8", paletteLabel: "Huyền Lam · Phương Thốn · Đạo Pháp" },
  "Ngũ Trang Tiên Quán": { color: "#133e2b", foil: "#eab308", paletteLabel: "Bích Lục · Thảo Hoàn Đan · Càn Khôn" },
  "Minh Giới U Hồn": { color: "#2a122e", foil: "#c084fc", paletteLabel: "U Minh Tử · Cương Thi · Huyết Nguyệt" },
  "Thiên Đình Chư Tiên": { color: "#78350f", foil: "#fde047", paletteLabel: "Tiêu Dao Kim · Bàn Đào · Quỳnh Tương" },
  "Thiên Đình Bát Bộ": { color: "#854d0e", foil: "#facc15", paletteLabel: "Thái Dương Kim · Lôi Vũ · Tinh Quân" },
  "Huyền Thoại Tiên Hiệp": { color: "#311409", foil: "#fb923c", paletteLabel: "Viêm Hỏa · Hoang Đỉnh · Vạn Cổ" },
};

const CATEGORY_MAP: Record<string, { label: string; tabName: MainTab; defaultColor: string; defaultFoil: string }> = {
  than_gioi: { label: "Thần Thoại & Tiên Giới", tabName: "THẦN THOẠI & TIÊN GIỚI", defaultColor: "#16348c", defaultFoil: "#efc16d" },
  tay_du: { label: "Tây Du & Minh Giới", tabName: "TÂY DU & MINH GIỚI", defaultColor: "#b93816", defaultFoil: "#efc16d" },
  viet_nam: { label: "Thần Thoại & Hào Kiệt Việt Nam", tabName: "THẦN THOẠI VIỆT NAM", defaultColor: "#182a43", defaultFoil: "#c87046" },
  tam_quoc: { label: "Tam Quốc Chí", tabName: "TAM QUỐC CHÍ", defaultColor: "#8c1e19", defaultFoil: "#efc16d" },
  kim_dung: { label: "Võ Lâm Kim Dung", tabName: "VÕ LÂM KIM DUNG", defaultColor: "#214252", defaultFoil: "#87dff6" },
  phong_van: { label: "Phong Vân & Võ Thuật", tabName: "PHONG VÂN & VÕ THUẬT", defaultColor: "#1c2b36", defaultFoil: "#ffffff" },
  wwe: { label: "Huyền Thoại WWE", tabName: "HUYỀN THOẠI WWE", defaultColor: "#1e293b", defaultFoil: "#f59e0b" },
};

export const FEATURED_3D_CARDS_DEFAULT: CardItemData[] = [
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

function formatCardItem(raw: any): CardItemData {
  const cat = CATEGORY_MAP[raw.category] || {
    label: raw.categoryLabel || "Chibi Tiên Cảnh",
    tabName: "SEE ALL" as MainTab,
    defaultColor: "#1a2536",
    defaultFoil: "#efc16d",
  };
  const pal = FACTION_PALETTES[raw.faction] || {
    color: cat.defaultColor,
    foil: cat.defaultFoil,
    paletteLabel: `${raw.faction || cat.label} · Hào Quang`,
  };

  return {
    id: raw.id || `CB-${Math.random().toString(36).substr(2, 5)}`,
    name: raw.name,
    title: raw.title || raw.name,
    category: raw.category || "than_gioi",
    categoryLabel: cat.label,
    faction: raw.faction || cat.label,
    image: raw.image || '/assets/card-back.svg',
    meaning: raw.meaning || 'Nhân vật truyền kỳ thuộc bộ sưu tập Chibi Tiên Cảnh 3D cao cấp.',
    rarity: raw.rarity || 'Chí Tôn Thần Thoại',
    element: raw.element || 'Thái Cực Âm Dương',
    slug: toSlug(raw.name),
    tabName: cat.tabName,
    color: pal.color,
    foil: pal.foil,
    paletteLabel: pal.paletteLabel,
    width: 1.15,
    height: 1.62,
    depth: 0.04,
  };
}

export function getRandomFeaturedCards(count = 10): CardItemData[] {
  if (!allChibiData || !Array.isArray(allChibiData) || allChibiData.length === 0) {
    return FEATURED_3D_CARDS_DEFAULT;
  }

  const pool = (allChibiData as any[]).filter(
    (c) => c && c.name && c.image && !c.image.includes('card-back')
  );

  // Group by realm / category for even balance
  const byCategory: Record<string, any[]> = {};
  pool.forEach((c) => {
    const cat = c.category || 'than_gioi';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(c);
  });

  const categories = Object.keys(byCategory);
  const pickedMap = new Map<string, CardItemData>();

  // Pick balanced items from each category
  const perCat = Math.max(1, Math.floor(count / Math.max(1, categories.length)));

  categories.forEach((cat) => {
    const list = [...byCategory[cat]];
    // Shuffle category list
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    list.slice(0, perCat).forEach((c) => {
      const formatted = formatCardItem(c);
      const core = formatted.name.split(' (')[0].trim();
      if (!pickedMap.has(core)) {
        pickedMap.set(core, formatted);
      }
    });
  });

  // Fill up remaining slots from global pool with random items
  if (pickedMap.size < count) {
    const remaining = pool.filter((c) => {
      const core = c.name.split(' (')[0].trim();
      return !pickedMap.has(core);
    });
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    for (const c of remaining) {
      if (pickedMap.size >= count) break;
      const formatted = formatCardItem(c);
      const core = formatted.name.split(' (')[0].trim();
      if (!pickedMap.has(core)) {
        pickedMap.set(core, formatted);
      }
    }
  }

  // Shuffle final list so positions on the 3D shelf are well mixed
  const result = Array.from(pickedMap.values());
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.length > 0 ? result : FEATURED_3D_CARDS_DEFAULT;
}

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

  // Dynamic Randomized Featured Cards State (Deterministic initial state for SSR hydration match)
  const [featuredCards, setFeaturedCards] = useState<CardItemData[]>(FEATURED_3D_CARDS_DEFAULT);
  const [isShuffling, setIsShuffling] = useState(false);

  // React state for UI
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<'hero' | 'opening' | 'detail' | 'closing'>('hero');
  const [cardFlipped, setCardFlipped] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // References for 3D loop state
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    controls: null as OrbitControls | null,
    shelfStage: null as THREE.Group | null,
    cardRigs: [] as any[],
    hitTargets: [] as THREE.Mesh[],
    cards: FEATURED_3D_CARDS_DEFAULT,
    rebuildRigs: null as ((cards: CardItemData[]) => void) | null,
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
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/gallery?tab=${encodeURIComponent(tabName)}`);
    }
  }, []);

  const handleCloseGallery = useCallback(() => {
    setGalleryOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
  }, []);

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScroll((prev) => {
      const next = !prev;
      stateRef.current.autoScroll = next;
      return next;
    });
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

      // Taiji Yin Yang
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 140, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(cx, cy + 70, 70, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(cx, cy - 70, 70, Math.PI / 2, -Math.PI / 2, false);
      ctx.fill();

      ctx.fillStyle = "#16348c";
      ctx.beginPath();
      ctx.arc(cx, cy, 140, Math.PI / 2, -Math.PI / 2, false);
      ctx.arc(cx, cy - 70, 70, -Math.PI / 2, Math.PI / 2, true);
      ctx.arc(cx, cy + 70, 70, -Math.PI / 2, Math.PI / 2, false);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
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

    const shelfTextureCache = new Map<string, THREE.Texture>();
    function loadShelfTexture(url: string): THREE.Texture {
      if (shelfTextureCache.has(url)) {
        return shelfTextureCache.get(url)!;
      }
      const tex = textureLoader.load(url, (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        loadedTex.generateMipmaps = true;
        loadedTex.needsUpdate = true;
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      shelfTextureCache.set(url, tex);
      return tex;
    }

    const cardBackTexture = makeCardBackTexture();
    const sharedCardGeometry = new THREE.BoxGeometry(1.15, 1.62, 0.04, 1, 1, 1);
    const sharedHitGeometry = new THREE.PlaneGeometry(1.15 * 1.05, 1.62 * 1.05);
    const sharedHitMaterial = new THREE.MeshBasicMaterial({ visible: false });

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

      // Reusable cached character illustration texture
      const frontTexture = loadShelfTexture(card.image);

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
        color: card.foil,
        roughness: 0.25,
        metalness: 0.85,
        transparent: true,
      });

      const materials = [
        edgeMat,  // right
        edgeMat,  // left
        edgeMat,  // top
        edgeMat,  // bottom
        frontMat, // front (Illustration)
        backMat   // back (Seal)
      ];

      const mesh = new THREE.Mesh(sharedCardGeometry, materials);
      motion.add(mesh);

      // Raycast hit target
      const hitMesh = new THREE.Mesh(sharedHitGeometry, sharedHitMaterial);
      hitMesh.position.z = depth * 0.5 + 0.01;
      hitMesh.userData.index = index;
      motion.add(hitMesh);
      S.hitTargets.push(hitMesh);

      return {
        root,
        motion,
        mesh,
        hitMesh,
        card,
        base: { width, height, depth },
        fadeMaterials: materials,
        opacity: 1
      };
    }

    // Responsive Targets Setup
    function configureResponsiveTargets() {
      const portrait = S.viewHeight > S.viewWidth;
      const narrow = S.viewWidth < 820;

      if (portrait) {
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
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(S.viewWidth, S.viewHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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

    // Theme update: KEEP FIXED DARK PALETTE
    function updateSelectionTheme(idx: number) {
      const currentList = S.cards && S.cards.length > 0 ? S.cards : featuredCards;
      const nextIdx = mod(idx, currentList.length);
      S.selectedIndex = nextIdx;
      setSelectedIndex(nextIdx);
      const card = currentList[nextIdx];

      if (card) {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--accent", card.foil);
        rootStyle.setProperty("--ink", "#f4eee6");
        rootStyle.setProperty("--ink-soft", "#a8b8d0");
      }
    }

    // Dynamic Rebuild function for Shuffle / Randomizer
    S.rebuildRigs = (newCards: CardItemData[]) => {
      S.cards = newCards;
      S.hitTargets = [];

      // Clear existing rigs
      S.cardRigs.forEach((rig) => {
        if (rig.root.parent) rig.root.parent.remove(rig.root);
        if (rig.fadeMaterials) {
          rig.fadeMaterials.forEach((m: any) => m?.dispose?.());
        }
      });

      // Build new rigs with 10 cards
      S.cardRigs = newCards.map((card, index) => {
        const rig = createCardRig(card, index);
        shelfStage.add(rig.root);
        return rig;
      });

      S.position = 0;
      S.targetPosition = 0;
      updateSelectionTheme(0);
    };

    // Pick 10 initial random cards once on mount
    const initialRandomCards = getRandomFeaturedCards(10);
    setFeaturedCards(initialRandomCards);
    S.cards = initialRandomCards;
    S.cardRigs = S.cards.map((card, index) => {
      const rig = createCardRig(card, index);
      shelfStage.add(rig.root);
      return rig;
    });
    updateSelectionTheme(0);

    // Animation Loop with Smooth 60-120fps Auto-Scroll
    function animate(time: number) {
      S.rafId = requestAnimationFrame(animate);
      const delta = Math.min((time - S.lastTime) / 1000, 0.05);
      S.lastTime = time;

      const cardCount = S.cards && S.cards.length > 0 ? S.cards.length : 10;

      if (S.mode === 'hero') {
        // Continuous smooth auto-scroll when not actively interacting
        if (S.autoScroll && !S.isInteracting && S.hoveredIndex === -1) {
          const scrollDelta = delta * 0.38; // Buttery smooth glide
          S.targetPosition += scrollDelta;
          // Advance position in lockstep to eliminate damp trailing-lag jitter
          S.position += scrollDelta;
        }

        // Damp only resolves residual difference from user interactions (drag/click)
        S.position = damp(S.position, S.targetPosition, 8.5, delta);
        if (Math.abs(S.position - S.targetPosition) < 0.0005) S.position = S.targetPosition;

        const nearest = mod(Math.round(S.position), cardCount);
        if (nearest !== S.selectedIndex) updateSelectionTheme(nearest);

        S.cardRigs.forEach((rig, index) => {
          if (rig.root.parent !== shelfStage) return;
          let offset = index - S.position;
          offset -= Math.round(offset / cardCount) * cardCount;
          const distance = Math.abs(offset);
          const focus = Math.max(0, 1 - distance * 0.95);
          const targetX = offset * spacing;
          const targetY = shelfBoardTop + rig.base.height * 0.5 + focus * 0.12;
          const targetZ = 0.12 + focus * 0.32 - Math.min(distance, 3.5) * 0.08;
          const targetScale = 1 + focus * 0.14;

          rig.root.position.set(targetX, targetY, targetZ);
          rig.root.rotation.y = -offset * 0.08;
          rig.root.scale.setScalar(targetScale);

          // Soft fade out for cards at edges
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

  const handleCloseDetail = () => {
    const S = stateRef.current;
    if (S.mode !== 'detail' || !S.activeCard) return;
    S.mode = 'closing';
    setMode('closing');
    S.transitionTime = 0;
    S.cardFlipped = false;
    setCardFlipped(false);
    setIsPanelCollapsed(false);
    if (S.controls) S.controls.enabled = false;
    S.vectors.closingCardStartPosition.copy(S.activeCard.root.position);
    S.vectors.closingCardStartQuaternion.copy(S.activeCard.root.quaternion);
    S.vectors.closingCardStartScale.copy(S.activeCard.root.scale);
    if (S.camera) S.vectors.closingCameraPosition.copy(S.camera.position);
    if (S.controls) S.vectors.closingCameraTarget.copy(S.controls.target);
    if (S.shelfStage) S.vectors.closingShelfPosition.copy(S.shelfStage.position);
    S.vectors.closingCardPosition.set(0, 0.38 + S.activeCard.base.height * 0.5 + 0.12, 0.44);
  };

  const handleShuffle = useCallback(() => {
    const S = stateRef.current;
    if (S.mode !== 'hero') {
      handleCloseDetail();
    }
    setIsShuffling(true);
    const newCards = getRandomFeaturedCards(10);
    setFeaturedCards(newCards);
    S.cards = newCards;
    if (S.rebuildRigs) {
      S.rebuildRigs(newCards);
    }
    setTimeout(() => setIsShuffling(false), 500);
  }, []);

  const handleOpenDetail = () => {
    const S = stateRef.current;
    if (S.mode !== 'hero') return;
    S.mode = 'opening';
    setMode('opening');
    S.transitionTime = 0;
    S.cardFlipped = false;
    setCardFlipped(false);
    setIsPanelCollapsed(false);
    S.activeCard = S.cardRigs[S.selectedIndex];

    if (S.activeCard) {
      S.activeCard.root.updateWorldMatrix(true, true);
      S.activeCard.root.matrixWorld.decompose(S.vectors.openingCardPosition, S.vectors.openingCardQuaternion, S.vectors.openingCardScale);
      S.vectors.openingCameraPosition.copy(S.camera!.position);
      S.vectors.openingCameraTarget.copy(S.vectors.transitionCameraTarget);
      S.vectors.openingShelfPosition.copy(S.shelfStage!.position);
      S.scene!.add(S.activeCard.root);
      S.activeCard.root.position.copy(S.vectors.openingCardPosition);
      S.activeCard.root.quaternion.copy(S.vectors.openingCardQuaternion);
      S.activeCard.root.scale.copy(S.vectors.openingCardScale);
    }
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

  const currentCard = featuredCards[selectedIndex] || featuredCards[0] || FEATURED_3D_CARDS_DEFAULT[0];

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
          <span>Bộ Sưu Tập 160+ Thẻ Chibi Thần Thoại & Võ Lâm</span>
        </div>
        <div className="editorial-index">
          <span>Phiên Bản TCG 2026</span>
          <span id="palette-label" suppressHydrationWarning>{currentCard.paletteLabel}</span>
        </div>
      </header>

      {/* Tooltip Label */}
      <div className="pointer-label" ref={pointerLabelRef} aria-hidden="true">
        <span>THẺ BÀI #{pad(selectedIndex + 1)}</span>
        <strong suppressHydrationWarning>{currentCard.name}</strong>
      </div>

      {/* Bottom Navigation UI */}
      <section className="browse-ui" id="browse-ui" aria-label="Card navigation">
        <div className="selection">
          <span className="counter" id="counter">{pad(selectedIndex + 1)} / {pad(featuredCards.length)}</span>
          <div className="selection__copy">
            <h1 className="selection__title" id="selection-title" suppressHydrationWarning>{currentCard.name}</h1>
            <p className="selection__note" id="selection-note" suppressHydrationWarning>{currentCard.title} · {currentCard.element}</p>
          </div>
        </div>

        <div className="browse-actions">
          <button className="round-button" id="previous" type="button" onClick={handlePrev} aria-label="Thẻ trước" title="Thẻ trước">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10.5 3.5-4.5 4.5 4.5 4.5"></path></svg>
          </button>

          {/* Shuffle / Randomize Button */}
          <button
            className="round-button auto-scroll-button"
            type="button"
            onClick={handleShuffle}
            aria-label="Đổi ngẫu nhiên 12 nhân vật khác"
            title="Đổi ngẫu nhiên nhân vật mới"
          >
            <Shuffle size={16} className={`text-emerald-400 ${isShuffling ? 'animate-spin' : ''}`} />
          </button>

          {/* Auto Scroll Pause/Play Button */}
          <button
            className={`round-button auto-scroll-button ${!isAutoScroll ? 'is-paused' : ''}`}
            type="button"
            onClick={toggleAutoScroll}
            aria-label={isAutoScroll ? "Tạm dừng tự động cuộn" : "Tiếp tục tự động cuộn"}
            title={isAutoScroll ? "Dừng tự động cuộn" : "Bật tự động cuộn"}
          >
            {isAutoScroll ? (
              <Pause size={16} className="text-[#87dff6]" />
            ) : (
              <Play size={16} className="text-amber-400 fill-amber-400 translate-x-[1px]" />
            )}
          </button>

          <button className="text-button" id="inspect" type="button" ref={inspectButtonRef} onClick={handleOpenDetail}>
            SOI THẺ 3D
          </button>

          <button className="round-button" id="next" type="button" onClick={handleNext} aria-label="Thẻ kế tiếp" title="Thẻ kế tiếp">
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
                stateRef.current.targetPosition = ratio * (featuredCards.length - 1);
              }}
            >
              <div
                className="card-scrollbar-thumb"
                style={{
                  width: `${100 / featuredCards.length}%`,
                  transform: `translateX(${selectedIndex * 100}%)`,
                }}
              />
            </div>
            <div className="card-scrollbar-labels">
              <span>01</span>
              <span className="current-track-num" suppressHydrationWarning>#{pad(selectedIndex + 1)} · {currentCard.name}</span>
              <span>{pad(featuredCards.length)}</span>
            </div>
          </div>
        </nav>
      </section>

      {/* Detail / Inspection Side Panel */}
      <aside
        className={`detail-panel ${isPanelCollapsed ? 'is-collapsed' : ''}`}
        id="detail-panel"
        ref={detailPanelRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={mode !== 'detail'}
      >
        {/* Mobile drag / tap handle */}
        <div
          className="sheet-handle"
          onClick={() => setIsPanelCollapsed((prev) => !prev)}
          aria-label={isPanelCollapsed ? "Mở rộng thông tin thẻ" : "Ẩn thông tin xuống"}
        />

        {/* Mobile Collapse Down Arrow Button */}
        <button
          className="collapse-button"
          id="collapse-detail"
          type="button"
          onClick={() => setIsPanelCollapsed((prev) => !prev)}
          aria-label={isPanelCollapsed ? "Hiện thông tin thẻ" : "Ẩn thông tin xuống"}
          title={isPanelCollapsed ? "Hiện thông tin thẻ" : "Ẩn thông tin xuống"}
        >
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${isPanelCollapsed ? 'rotate-180 text-amber-400' : ''}`}
          />
        </button>

        <button className="close-button" id="close-detail" type="button" ref={closeButtonRef} onClick={handleCloseDetail} aria-label="Đặt thẻ lại lên kệ">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"></path></svg>
        </button>

        <p className="eyebrow" id="detail-eyebrow" onClick={() => isPanelCollapsed && setIsPanelCollapsed(false)}>
          THẺ BÀI #{pad(selectedIndex + 1)} · {currentCard.faction}
        </p>
        <h2 className="detail-title" id="detail-title" onClick={() => isPanelCollapsed && setIsPanelCollapsed(false)}>
          {currentCard.name}
        </h2>
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
          <p className="microcopy">Rê chuột xoay góc nhìn 3D</p>
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
              <span>Thư Viện 160+ Thẻ</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="sr-only" id="live-region" aria-live="polite"></div>

      {/* 2D Full Card Gallery Modal Integration */}
      <TarotBookPopup
        open={galleryOpen}
        onClose={handleCloseGallery}
        initialTab={galleryTab}
      />
    </div>
  );
}
