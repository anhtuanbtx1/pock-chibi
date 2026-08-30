'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Sparkles,
  Layers,
  ArrowLeft,
  Home,
  Shield,
  Flame,
  Zap,
  Sword,
  Compass,
  Star,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  ChibiCard,
  ChibiData,
  CardGroup,
  CATEGORY_SECTIONS,
  MAIN_TABS,
  MainTab,
} from '@/components/TarotBookPopup';

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// ── 3D Perspective Card Component ─────────────────────────────────────────
function GalleryPokemonCard({
  group,
  index,
  onClick,
}: {
  group: CardGroup;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50, isHovered: false });
  const rafRef = useRef<number | null>(null);

  const firstCard = group.cards[0];
  const image = firstCard?.image;
  const variantCount = group.cards.length;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '160px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = -((y - centerY) / centerY) * 12;
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;

      setTilt({ rotateX, rotateY, shineX, shineY, isHovered: true });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50, isHovered: false });
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!image) return null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: Math.min((index % 12) * 0.03, 0.3) }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer flex flex-col rounded-2xl p-2.5 transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(70,148,209,0.3)] hover:-translate-y-1.5"
      style={{
        transformStyle: 'preserve-3d',
        transform: tilt.isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out, background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* 3D Card Visual Wrapper */}
      <div className="relative aspect-[245/342.6] w-full overflow-hidden rounded-xl bg-[#0d131f] border border-white/15 shadow-inner">
        {isInView ? (
          <img
            src={image}
            alt={group.coreName}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#121826] animate-pulse" />
        )}

        {/* Dynamic Holographic Reflection */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            opacity: tilt.isHovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.45) 0%, rgba(135,223,246,0.3) 30%, rgba(230,0,126,0.2) 60%, transparent 80%)`,
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Variant Count Badge */}
        {variantCount > 1 && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#87dff6] border border-cyan-400/40 shadow-md">
            {variantCount} biến thể
          </div>
        )}

        {/* Category Realm Tag */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-[#e6007e]/80 backdrop-blur-md text-white border border-pink-400/30 shadow-md">
          {group.faction}
        </div>
      </div>

      {/* Card Info Below */}
      <div className="mt-2.5 px-1 flex flex-col">
        <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#87dff6] transition-colors truncate">
          {group.coreName}
        </h4>
        <div className="flex items-center justify-between text-[10px] text-white/50 font-bold mt-0.5">
          <span className="truncate max-w-[120px]">{group.categoryLabel}</span>
          <span className="text-[#87dff6] group-hover:translate-x-0.5 transition-transform font-extrabold flex items-center gap-0.5">
            <span>Chi tiết</span>
            <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Gallery Page Content Component ────────────────────────────────────
function GalleryPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTabQuery = searchParams.get('tab') as MainTab | null;
  const initialSearchQuery = searchParams.get('q') || '';

  const [activeTab, setActiveTab] = useState<MainTab>(initialTabQuery || 'SEE ALL');
  const [search, setSearch] = useState(initialSearchQuery);
  const [data, setData] = useState<ChibiData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync tab with URL if changed
  useEffect(() => {
    if (initialTabQuery && MAIN_TABS.includes(initialTabQuery)) {
      setActiveTab(initialTabQuery);
    }
  }, [initialTabQuery]);

  useEffect(() => {
    fetch('/api/tarot/cards')
      .then((res) => res.json())
      .then((val) => {
        setData(val);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getCoreName = (name: string) => name.split(' (')[0].trim();

  // Aggregate and group cards into unique characters
  const allGroups = useMemo(() => {
    if (!data) return [];
    const groups: CardGroup[] = [];

    CATEGORY_SECTIONS.forEach((sec) => {
      const rawCards = data[sec.key as keyof ChibiData] || [];
      const valid = rawCards.filter((c) => typeof c !== 'string' && Boolean(c.image));

      const groupedMap = new Map<string, ChibiCard[]>();
      valid.forEach((card) => {
        const core = getCoreName(card.name);
        if (!groupedMap.has(core)) groupedMap.set(core, []);
        groupedMap.get(core)!.push(card);
      });

      groupedMap.forEach((cards, coreName) => {
        groups.push({
          coreName,
          cards,
          faction: cards[0]?.faction || sec.label,
          categoryLabel: sec.label,
          category: sec.key,
        });
      });
    });

    return groups;
  }, [data]);

  // Filtered Cards
  const filteredGroups = useMemo(() => {
    let result = allGroups;

    // Filter by Tab
    if (activeTab !== 'SEE ALL') {
      if (activeTab === 'SPECIAL ART') {
        result = result.filter((g) => g.cards.length > 1);
      } else {
        const sec = CATEGORY_SECTIONS.find((s) => s.tabName === activeTab);
        if (sec) {
          result = result.filter((g) => g.category === sec.key);
        }
      }
    }

    // Filter by Search Query
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((g) => {
        const matchCore = g.coreName.toLowerCase().includes(q);
        const matchFaction = g.faction.toLowerCase().includes(q);
        const matchCategory = g.categoryLabel.toLowerCase().includes(q);
        const matchCards = g.cards.some(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            (c.title && c.title.toLowerCase().includes(q)) ||
            (c.meaning && c.meaning.toLowerCase().includes(q)) ||
            (c.element && c.element.toLowerCase().includes(q)) ||
            (c.rarity && c.rarity.toLowerCase().includes(q))
        );
        return matchCore || matchFaction || matchCategory || matchCards;
      });
    }

    return result;
  }, [allGroups, activeTab, search]);

  const handleCardClick = (group: CardGroup) => {
    const slug = toSlug(group.coreName);
    router.push(`/cards/${slug}`);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-white selection:bg-[#e6007e]/30 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d101c] via-[#07090e] to-[#040508]" />
        <div className="absolute -top-[10%] left-[15%] w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute top-[35%] -right-[15%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[160px]" />
        <div className="absolute -bottom-[10%] left-[30%] w-[800px] h-[600px] rounded-full bg-blue-700/10 blur-[170px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-28">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white/90 font-extrabold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Home size={16} />
              <span>Về trang chủ</span>
            </Link>

            <span className="hidden sm:inline-block text-xs font-bold text-white/40">/</span>

            <span className="text-xs font-black uppercase tracking-wider text-[#87dff6]">
              Bộ Sưu Tập Thẻ Chibi 3D
            </span>
          </div>

          {/* Stats Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#e6007e]/20 text-[#ff4081] border border-[#e6007e]/40 shadow-sm">
              {allGroups.length > 0 ? `${allGroups.length}+ Nhân vật` : '120+ Thẻ bài'}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/20 text-[#87dff6] border border-cyan-400/30 shadow-sm">
              6 Giới Vực
            </span>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md"
          >
            BỘ SƯU TẬP THẺ CHIBI 3D
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-2.5 text-xs sm:text-sm text-white/60 font-medium"
          >
            Khám phá 120+ nhân vật thần thoại, võ lâm, tam quốc và hào kiệt trong tiên cảnh Chibi 3D.
          </motion.p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="flex flex-col gap-5 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm nhân vật, môn phái, võ học, công pháp..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border border-white/15 focus:border-cyan-400 text-sm font-semibold text-white placeholder-white/40 focus:outline-none transition-all shadow-inner"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Xóa tìm kiếm"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {MAIN_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#e6007e] to-[#4694d1] text-white shadow-lg shadow-pink-500/25 border border-white/40 scale-105'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {tab === 'SEE ALL' ? 'TẤT CẢ' : tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#3eaeba] border-t-transparent animate-spin" />
            <p className="text-[#87dff6] font-bold">Đang tải toàn bộ thư viện thẻ...</p>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10 p-8">
            <h3 className="text-lg font-black text-white mb-2">Không tìm thấy thẻ bài phù hợp</h3>
            <p className="text-xs text-white/50 mb-4">
              Thử tìm kiếm với từ khóa khác hoặc chọn xem &quot;TẤT CẢ&quot;.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveTab('SEE ALL');
              }}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition-all"
            >
              Xem tất cả nhân vật
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-white/50 mb-4 px-1">
              <span>Hiển thị {filteredGroups.length} nhân vật</span>
              <span>Bấm vào thẻ để xem profile 3D chi tiết</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
              {filteredGroups.map((group, idx) => (
                <GalleryPokemonCard
                  key={group.coreName}
                  group={group}
                  index={idx}
                  onClick={() => handleCardClick(group)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white">
          <div className="w-12 h-12 rounded-full border-4 border-[#3eaeba] border-t-transparent animate-spin" />
        </div>
      }
    >
      <GalleryPageContent />
    </Suspense>
  );
}
