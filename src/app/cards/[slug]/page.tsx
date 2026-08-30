'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Shield,
  Zap,
  Award,
  Flame,
  Star,
  BookOpen,
  Home,
  ChevronDown,
  Sword,
  Compass,
  Heart,
  Wind
} from 'lucide-react';
import { ChibiCard, ChibiData, CATEGORY_SECTIONS } from '@/components/TarotBookPopup';

interface CardGroup {
  coreName: string;
  cards: ChibiCard[];
  faction: string;
  categoryLabel: string;
  category: string;
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

export default function CardDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug ? decodeURIComponent(Array.isArray(params.slug) ? params.slug[0] : params.slug) : '';
  
  const [data, setData] = useState<ChibiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [variantIdx, setVariantIdx] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50, isHovered: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fetch('/api/tarot/cards')
      .then(res => res.json())
      .then(val => {
        setData(val);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getCoreName = (name: string) => name.split(' (')[0].trim();

  // Find target card group
  const cardGroup: CardGroup | null = useMemo(() => {
    if (!data || !rawSlug) return null;
    const targetSlug = rawSlug.toLowerCase().trim();
    const targetCleanSlug = toSlug(targetSlug);

    for (const sec of CATEGORY_SECTIONS) {
      const raw = data[sec.key as keyof ChibiData];
      if (!raw) continue;
      const validCards = (raw as ChibiCard[]).filter(c => typeof c !== 'string' && Boolean(c.image));

      const grouped = new Map<string, ChibiCard[]>();
      validCards.forEach(card => {
        const core = getCoreName(card.name);
        if (!grouped.has(core)) grouped.set(core, []);
        grouped.get(core)!.push(card);
      });

      for (const [coreName, cards] of Array.from(grouped.entries())) {
        const coreSlug = toSlug(coreName);
        if (
          coreSlug === targetCleanSlug ||
          coreName.toLowerCase() === targetSlug ||
          cards.some(c => toSlug(c.name) === targetCleanSlug || c.name.toLowerCase() === targetSlug) ||
          coreSlug.includes(targetCleanSlug) ||
          targetCleanSlug.includes(coreSlug) ||
          coreName.toLowerCase().includes(targetSlug) ||
          targetSlug.includes(coreName.toLowerCase())
        ) {
          return {
            coreName,
            cards,
            faction: cards[0]?.faction || sec.label,
            categoryLabel: sec.label,
            category: sec.key,
          };
        }
      }
    }
    return null;
  }, [data, rawSlug]);

  // Related cards from the same faction/category
  const relatedCards = useMemo(() => {
    if (!data || !cardGroup) return [];
    const raw = data[cardGroup.category as keyof ChibiData];
    if (!raw) return [];
    const validCards = (raw as ChibiCard[]).filter(c => typeof c !== 'string' && Boolean(c.image));
    
    const grouped = new Map<string, ChibiCard[]>();
    validCards.forEach(card => {
      const core = getCoreName(card.name);
      if (core !== cardGroup.coreName) {
        if (!grouped.has(core)) grouped.set(core, []);
        grouped.get(core)!.push(card);
      }
    });

    return Array.from(grouped.entries()).slice(0, 6).map(([coreName, cards]) => ({
      coreName,
      cards,
      faction: cards[0]?.faction || cardGroup.categoryLabel,
      categoryLabel: cardGroup.categoryLabel,
    }));
  }, [data, cardGroup]);

  const currentCard = cardGroup?.cards[variantIdx] || cardGroup?.cards[0];

  // requestAnimationFrame 60fps tilt calculation
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
      const rotateY = ((x - centerX) / centerX) * 16;
      const rotateX = -((y - centerY) / centerY) * 16;
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

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0c14] text-white selection:bg-[#e6007e]/30 overflow-x-hidden">
      {/* Top Glowing Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#e6007e] via-[#4694d1] to-[#efc16d] shadow-[0_0_12px_rgba(70,148,209,0.8)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Standalone Dedicated Detail Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e111d] via-[#090b12] to-[#05060a]" />
        <div className="absolute -top-[15%] left-[20%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/5 blur-[130px]" />
        <div className="absolute top-[25%] -right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-pink-600/12 to-purple-600/5 blur-[140px]" />
        <div className="absolute -bottom-[10%] left-[25%] w-[750px] h-[550px] rounded-full bg-gradient-to-tr from-blue-700/15 to-transparent blur-[160px]" />
        
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-28">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap">
          {/* Distinct Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* 1. Quay lại bộ sưu tập */}
            <Link
              href="/?gallery=open"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#e6007e] to-[#4694d1] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-pink-500/25 border border-white/30 hover:scale-105 active:scale-95"
            >
              <Layers size={16} />
              <span>Quay lại bộ sưu tập</span>
            </Link>

            {/* 2. Về trang chủ */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white/90 font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Home size={16} />
              <span>Về trang chủ</span>
            </Link>
          </div>

          {/* Right Badges */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#e6007e]/20 text-[#ff4081] border border-[#e6007e]/40">
              {cardGroup?.categoryLabel || 'CHIBI TIÊN CẢNH'}
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-[#87dff6] border border-white/15">
              {cardGroup?.faction || 'THẦN THOẠI'}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#3eaeba] border-t-transparent animate-spin" />
            <p className="text-[#87dff6] font-bold">Đang tải thông tin nhân vật...</p>
          </div>
        ) : !cardGroup || !currentCard ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md p-8">
            <h2 className="text-2xl font-black text-white mb-2">Không tìm thấy nhân vật</h2>
            <p className="text-white/60 mb-6">Nhân vật &quot;{rawSlug}&quot; không tồn tại hoặc đã được cập nhật.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/?gallery=open"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e6007e] to-[#4694d1] text-white font-bold shadow-lg hover:scale-105 transition-all"
              >
                <Layers size={18} />
                <span>Mở bộ sưu tập thẻ</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold transition-all"
              >
                <Home size={18} />
                <span>Về trang chủ</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* 3D Showcase Card Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full max-w-[290px] sm:max-w-[360px] aspect-[245/342.6] rounded-[22px] overflow-hidden relative cursor-grab shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(70,148,209,0.35)] border-2 border-white/30 group"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  <img
                    src={currentCard.image || '/assets/card-back.svg'}
                    alt={currentCard.name}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Holographic sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[22px]"
                    style={{
                      opacity: tilt.isHovered ? 1 : 0,
                      transition: 'opacity 0.25s ease',
                      background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.5) 0%, rgba(135,223,246,0.3) 30%, rgba(230,0,126,0.2) 60%, transparent 80%)`,
                      mixBlendMode: 'color-dodge',
                    }}
                  />
                  <div className="card-shimmer-overlay" />
                </motion.div>

                {/* Variant Selector */}
                {cardGroup.cards.length > 1 && (
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="text-[11px] font-bold text-white/50 px-2 uppercase">Phiên bản:</span>
                    {cardGroup.cards.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setVariantIdx(i)}
                        className={`px-3.5 py-1 rounded-xl text-xs font-extrabold transition-all ${
                          i === variantIdx
                            ? 'bg-gradient-to-r from-[#e6007e] to-[#9c27b0] text-white shadow-md shadow-pink-500/30 border border-white/40'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Mobile scroll down helper banner */}
                <div className="lg:hidden mt-4 flex items-center gap-2 text-xs font-bold text-[#87dff6] bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 rounded-full animate-bounce">
                  <ChevronDown size={15} />
                  <span>Kéo xuống để xem chi tiết nhân vật & võ học</span>
                </div>
              </div>

              {/* Card Information & Attributes Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Header Info */}
                <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-[#e6007e] to-[#ff4081] text-white shadow-md">
                      {cardGroup.faction}
                    </span>
                    <span className="text-xs font-bold text-[#87dff6] uppercase tracking-wider">
                      {cardGroup.categoryLabel}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    {currentCard.name || cardGroup.coreName}
                  </h1>

                  {currentCard.title && (
                    <p className="mt-1.5 text-sm sm:text-base font-bold text-[#80c6ff] tracking-wide">
                      {currentCard.title}
                    </p>
                  )}

                  {currentCard.meaning ? (
                    <p className="mt-3.5 text-sm sm:text-base text-white/80 leading-relaxed font-medium">
                      {currentCard.meaning}
                    </p>
                  ) : (
                    <p className="mt-3.5 text-xs sm:text-sm text-white/60 leading-relaxed font-medium">
                      Nhân vật truyền kỳ thuộc bộ sưu tập Chibi Tiên Cảnh 3D cao cấp.
                    </p>
                  )}
                </div>

                {/* Card Attribute Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#87dff6] flex items-center justify-center flex-shrink-0">
                      <Sparkles size={19} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase">Độ hiếm</div>
                      <div className="text-xs sm:text-sm font-black text-white">{currentCard.rarity || 'Chí Tôn Thần Thoại'}</div>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-[#ff4081] flex items-center justify-center flex-shrink-0">
                      <Flame size={19} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase">Công Pháp / Nguyên Tố</div>
                      <div className="text-xs sm:text-sm font-black text-white">{currentCard.element || 'Thái Cực Âm Dương'}</div>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#80c6ff] flex items-center justify-center flex-shrink-0">
                      <Shield size={19} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase">Môn Phái / Thế Lực</div>
                      <div className="text-xs sm:text-sm font-black text-white truncate max-w-[140px]">{cardGroup.faction}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Martial Power & Lore Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-bold text-[#87dff6] uppercase mb-1 flex items-center justify-center gap-1">
                      <Sword size={12} />
                      <span>Công Lực</span>
                    </div>
                    <div className="text-lg font-black text-amber-400">999+</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-bold text-[#87dff6] uppercase mb-1 flex items-center justify-center gap-1">
                      <Shield size={12} />
                      <span>Phòng Ngự</span>
                    </div>
                    <div className="text-lg font-black text-cyan-400">980+</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-bold text-[#87dff6] uppercase mb-1 flex items-center justify-center gap-1">
                      <Wind size={12} />
                      <span>Thân Pháp</span>
                    </div>
                    <div className="text-lg font-black text-emerald-400">960+</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-bold text-[#87dff6] uppercase mb-1 flex items-center justify-center gap-1">
                      <Zap size={12} />
                      <span>Linh Lực</span>
                    </div>
                    <div className="text-lg font-black text-purple-400">MAX</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Cards in Same Category Section */}
            {relatedCards.length > 0 && (
              <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md mt-4">
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white/90 flex items-center gap-2">
                    <Layers size={18} className="text-[#87dff6]" />
                    <span>Nhân vật khác cùng nhóm {cardGroup.categoryLabel}</span>
                  </h3>
                  <Link
                    href={`/?gallery=open`}
                    className="text-xs font-bold text-[#87dff6] hover:underline"
                  >
                    Xem tất cả &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                  {relatedCards.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={`/cards/${toSlug(rel.coreName)}`}
                      className="group relative block aspect-[245/342.6] rounded-xl overflow-hidden border border-white/15 hover:border-cyan-400/80 transition-all hover:scale-105 shadow-lg"
                    >
                      <img
                        src={rel.cards[0]?.image || '/assets/card-back.svg'}
                        alt={rel.coreName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-[11px] font-bold text-white leading-tight truncate">
                          {rel.coreName}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
