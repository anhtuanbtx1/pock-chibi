'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Layers, ExternalLink, Shield, Flame, Zap } from 'lucide-react';

export interface CharacterStats {
  congLuc: string;
  phongNgu: string;
  thanPhap: string;
  linhLuc: string;
}

export interface ChibiCard {
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
  stats?: Partial<CharacterStats>;
}

export interface ChibiData {
  than_gioi: ChibiCard[];
  tay_du: ChibiCard[];
  viet_nam: ChibiCard[];
  tam_quoc: ChibiCard[];
  kim_dung: ChibiCard[];
  phong_van: ChibiCard[];
  wwe: ChibiCard[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialTab?: MainTab;
}

export interface CardGroup {
  coreName: string;
  cards: ChibiCard[];
  faction: string;
  categoryLabel: string;
  category: string;
}

export const CATEGORY_SECTIONS = [
  { key: 'than_gioi',  label: 'Thần Thoại & Tiên Giới', tabName: 'THẦN THOẠI & TIÊN GIỚI' },
  { key: 'tay_du',     label: 'Tây Du & Minh Giới',     tabName: 'TÂY DU & MINH GIỚI' },
  { key: 'viet_nam',   label: 'Thần Thoại Việt Nam',    tabName: 'THẦN THOẠI VIỆT NAM' },
  { key: 'tam_quoc',   label: 'Tam Quốc Chí',           tabName: 'TAM QUỐC CHÍ' },
  { key: 'kim_dung',   label: 'Võ Lâm Kim Dung',        tabName: 'VÕ LÂM KIM DUNG' },
  { key: 'phong_van',  label: 'Phong Vân & Võ Thuật',   tabName: 'PHONG VÂN & VÕ THUẬT' },
  { key: 'wwe',        label: 'Huyền Thoại WWE',        tabName: 'HUYỀN THOẠI WWE' },
] as const;

export const MAIN_TABS = [
  'SEE ALL',
  'THẦN THOẠI & TIÊN GIỚI',
  'TÂY DU & MINH GIỚI',
  'THẦN THOẠI VIỆT NAM',
  'TAM QUỐC CHÍ',
  'VÕ LÂM KIM DUNG',
  'PHONG VÂN & VÕ THUẬT',
  'HUYỀN THOẠI WWE',
  'SPECIAL ART',
] as const;

export type MainTab = typeof MAIN_TABS[number];

// ── 3D Perspective Pokémon Card Component (With IntersectionObserver & rAF) ────────────
function PerspectivePokemonCard({
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

  // 1. IntersectionObserver: Lazy-load image and trigger smooth GPU scroll entrance
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
      {
        rootMargin: '160px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. requestAnimationFrame: 60fps smooth tilt and holographic reflection calculation
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
    <div
      ref={cardRef}
      style={{
        perspective: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0px) scale(1)' : 'translateY(36px) scale(0.96)',
        transition: 'opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer select-none group"
        style={{
          width: '100%',
          maxWidth: 340,
          aspectRatio: '245 / 342.6',
          transformStyle: 'preserve-3d',
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.05, 1.05, 1.05) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)',
          transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          position: 'relative',
          borderRadius: 18,
          boxShadow: tilt.isHovered
            ? '0 26px 55px rgba(0, 0, 0, 0.8), 0 0 35px rgba(70, 148, 209, 0.45), 0 0 0 1.5px rgba(135, 223, 246, 0.45)'
            : '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Full Card Image - Edge to Edge with Lazy Loading */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 18,
            overflow: 'hidden',
            background: '#161823',
          }}
        >
          {isInView ? (
            <img
              src={image}
              alt={group.coreName}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          ) : (
            <div className="w-full h-full bg-white/5 animate-pulse" />
          )}

          {/* Interactive Dynamic Holographic Sheen on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 18,
              opacity: tilt.isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.45) 0%, rgba(135,223,246,0.3) 30%, rgba(230,0,126,0.18) 55%, transparent 75%)`,
              mixBlendMode: 'color-dodge',
              zIndex: 3,
            }}
          />

          {/* Holographic Shimmer linear pass on hover */}
          <div className="card-shimmer-overlay" />
        </div>

        {/* Multi-variant badge (e.g. ✦ 2 Biến thể) */}
        {variantCount > 1 && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 9px',
              borderRadius: 999,
              background: 'rgba(10, 15, 25, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#87dff6',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.04em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
            }}
          >
            <Sparkles size={11} className="text-yellow-300 animate-pulse" />
            <span>{variantCount} Biến thể</span>
          </div>
        )}

        {/* Character Name Tag at Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            zIndex: 10,
            padding: '4px 10px',
            borderRadius: 8,
            background: 'rgba(10, 14, 24, 0.78)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.03em',
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            opacity: tilt.isHovered ? 1 : 0.9,
            transition: 'all 0.2s ease',
          }}
        >
          {firstCard?.name || group.coreName}
        </div>
      </div>
    </div>
  );
}

// ── 3D Card Inspector Focus Modal ────────────────────────────────────────
function FocusedCardInspector({
  group,
  onClose,
}: {
  group: CardGroup;
  onClose: () => void;
}) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50, isHovered: false });
  const [isFlipping, setIsFlipping] = useState(false);
  const rafRef = useRef<number | null>(null);

  const currentCard = group.cards[variantIdx] || group.cards[0];

  // requestAnimationFrame optimized mouse tilt calculation
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
      const rotateY = ((x - centerX) / centerX) * 18;
      const rotateX = -((y - centerY) / centerY) * 18;
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

  const switchVariant = (newIdx: number) => {
    if (newIdx === variantIdx) return;
    setIsFlipping(true);
    setTimeout(() => {
      setVariantIdx(newIdx);
      setIsFlipping(false);
    }, 180);
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        background: 'rgba(7, 9, 15, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        perspective: 1200,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
      onClick={onClose}
    >
      {/* Top Bar with Card Name & Action Buttons */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 160,
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#e6007e',
                background: 'rgba(230, 0, 126, 0.15)',
                padding: '3px 10px',
                borderRadius: 999,
                border: '1px solid rgba(230, 0, 126, 0.3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {group.faction}
            </span>
            <span style={{ fontSize: 11, color: '#87dff6', fontWeight: 600 }}>
              {group.categoryLabel}
            </span>
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '0.03em',
              margin: '6px 0 0',
              textShadow: '0 2px 14px rgba(0,0,0,0.8)',
            }}
          >
            {currentCard.name || group.coreName}
          </h2>
          {currentCard.title && (
            <p style={{ fontSize: 13, color: '#80c6ff', margin: '3px 0 0', fontWeight: 600 }}>
              {currentCard.title}
            </p>
          )}
          {currentCard.meaning && (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: '4px 0 0', maxWidth: 480 }}>
              {currentCard.meaning}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
          <Link
            href={`/cards/${encodeURIComponent(group.coreName)}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #e6007e, #4694d1)',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 18px rgba(230, 0, 126, 0.45)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            className="hover:scale-105 hover:brightness-110 active:scale-95"
          >
            <ExternalLink size={16} />
            <span>Chi tiết thẻ</span>
          </Link>

          <button
            onClick={onClose}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              fontSize: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
            aria-label="Close modal"
            className="hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* 3D High-Res Tilt Card */}
      <motion.div
        onClick={e => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group"
        initial={{
          scale: 0.05,
          rotateY: -360,
          rotateX: 30,
          rotateZ: -18,
          y: 160,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          rotateY: isFlipping ? 90 : tilt.rotateY,
          rotateX: isFlipping ? 0 : tilt.rotateX,
          rotateZ: 0,
          y: 0,
          opacity: 1,
        }}
        exit={{
          scale: 0.05,
          rotateY: 360,
          rotateX: -30,
          rotateZ: 18,
          y: 160,
          opacity: 0,
          transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1] },
        }}
        transition={{
          duration: 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'relative',
          width: 'min(360px, 86vw)',
          aspectRatio: '245 / 342.6',
          borderRadius: 20,
          boxShadow: tilt.isHovered
            ? '0 35px 90px rgba(0, 0, 0, 0.85), 0 0 60px rgba(70, 148, 209, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.4)'
            : '0 25px 70px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          transformStyle: 'preserve-3d',
          cursor: 'grab',
          overflow: 'hidden',
          background: '#161823',
          transition: tilt.isHovered ? 'box-shadow 0.2s ease' : 'box-shadow 0.5s ease',
        }}
      >
        <img
          src={currentCard.image || '/assets/card-back.svg'}
          alt={currentCard.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />

        {/* Dynamic Holographic Foil Light Reflection - only on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: tilt.isHovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.55) 0%, rgba(135,223,246,0.35) 30%, rgba(230,0,126,0.2) 60%, transparent 80%)`,
            mixBlendMode: 'color-dodge',
            borderRadius: 20,
          }}
        />

        {/* Shimmer effect only on hover */}
        <div className="card-shimmer-overlay" />
      </motion.div>

      {/* Variant Selector (if multiple cards exist) */}
      {group.cards.length > 1 && (
        <motion.div
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(16, 20, 32, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: '8px 18px',
            borderRadius: 999,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 160,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginRight: 4 }}>
            Phiên bản ({group.cards.length}):
          </span>
          {group.cards.map((c, i) => (
            <button
              key={i}
              onClick={() => switchVariant(i)}
              style={{
                padding: '6px 16px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                color: i === variantIdx ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                background: i === variantIdx ? 'linear-gradient(135deg, #e6007e, #9c27b0)' : 'rgba(255,255,255,0.08)',
                border: i === variantIdx ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: i === variantIdx ? '0 4px 14px rgba(230,0,126,0.4)' : 'none',
              }}
            >
              {c.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Main Tarot / Pokémon Card Gallery Popup ──────────────────────────────
export default function TarotBookPopup({ open, onClose, initialTab }: Props) {
  const [activeTab, setActiveTab] = useState<MainTab>(initialTab || 'SEE ALL');
  const [selectedFaction, setSelectedFaction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [data, setData] = useState<ChibiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<CardGroup | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, open]);

  useEffect(() => {
    if (open) {
      fetch('/api/tarot/cards')
        .then(res => res.json())
        .then(val => {
          setData(val);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open]);

  const getCoreName = (name: string) => name.split(' (')[0].trim();

  // Aggregate all cards with category & faction info
  const allCardGroups = useMemo(() => {
    if (!data) return [];
    const list: CardGroup[] = [];

    CATEGORY_SECTIONS.forEach(sec => {
      const raw = data[sec.key as keyof ChibiData];
      if (!raw) return;
      const validCards = (raw as ChibiCard[]).filter(c => typeof c !== 'string' && Boolean(c.image));
      const grouped = new Map<string, ChibiCard[]>();

      validCards.forEach(card => {
        const core = getCoreName(card.name);
        if (!grouped.has(core)) grouped.set(core, []);
        grouped.get(core)!.push(card);
      });

      grouped.forEach((cards, coreName) => {
        list.push({
          coreName,
          cards,
          faction: cards[0]?.faction || sec.label,
          categoryLabel: sec.label,
          category: sec.key,
        });
      });
    });

    return list;
  }, [data]);

  // Filter based on tab, faction, and search
  const filteredCards = useMemo(() => {
    let result = allCardGroups;

    // Tab filter
    if (activeTab === 'SPECIAL ART') {
      result = result.filter(g => g.cards.length > 1);
    } else if (activeTab !== 'SEE ALL') {
      const currentSec = CATEGORY_SECTIONS.find(s => s.tabName === activeTab);
      if (currentSec) {
        result = result.filter(g => g.category === currentSec.key);
      }
    }

    // Faction filter (if selected)
    if (selectedFaction !== 'ALL') {
      result = result.filter(g => g.faction === selectedFaction);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(g =>
        g.coreName.toLowerCase().includes(q) ||
        g.faction.toLowerCase().includes(q) ||
        g.cards.some(c => c.name.toLowerCase().includes(q) || (c.title && c.title.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [allCardGroups, activeTab, selectedFaction, searchQuery]);

  // Available factions in current tab for sub-filtering
  const availableFactions = useMemo(() => {
    const currentList = activeTab === 'SEE ALL' || activeTab === 'SPECIAL ART'
      ? allCardGroups
      : allCardGroups.filter(g => {
          const currentSec = CATEGORY_SECTIONS.find(s => s.tabName === activeTab);
          return currentSec ? g.category === currentSec.key : true;
        });

    const set = new Set<string>();
    currentList.forEach(g => set.add(g.faction));
    return Array.from(set);
  }, [allCardGroups, activeTab]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100vw',
          height: '100vh',
          maxHeight: '100vh',
          background: 'radial-gradient(ellipse at 50% 0%, #1e1b2e 0%, #11131c 50%, #0a0b10 100%)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top subtle ambient glow bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #ff007a, #3eaeba, #80c6ff, #ff007a)',
            backgroundSize: '200% 100%',
            zIndex: 110,
          }}
        />

        {/* ── 3D Card Focused Inspector ─────────────────────────── */}
        <AnimatePresence>
          {selectedGroup && (
            <FocusedCardInspector
              group={selectedGroup}
              onClose={() => setSelectedGroup(null)}
            />
          )}
        </AnimatePresence>

        {/* ── Header Navigation & Filters (Pokemon TCG Style) ───── */}
        <header className="p-3.5 sm:p-6 sm:pb-4 bg-[rgba(17,19,28,0.95)] border-b border-white/10 flex flex-col gap-3 sm:gap-4 z-[105] shadow-xl">
          {/* Top Title & Close Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            {/* Logo and title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #e6007e, #4694d1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 18px rgba(230, 0, 126, 0.4)',
                }}
              >
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <h1
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    BỘ SƯU TẬP THẺ CHIBI
                  </h1>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#87dff6',
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 999,
                      border: '1px solid rgba(135, 223, 246, 0.25)',
                    }}
                  >
                    {filteredCards.length} THẺ
                  </span>
                </div>
              </div>
            </div>

            {/* Search Input & Close button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 999,
                  padding: '6px 14px',
                  width: 'min(240px, 50vw)',
                }}
              >
                <Search size={15} className="text-white/50" />
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFFFFF',
                    fontSize: 13,
                    width: '100%',
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    <X size={13} />
                  </button>
                )}
              </div>

              <button
                onClick={onClose}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Filter Tabs (Official Pokémon TCG Pill Style) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              overflowX: 'auto',
              paddingBottom: 4,
              scrollbarWidth: 'none',
            }}
          >
            {MAIN_TABS.map(tab => {
              const isActive = activeTab === tab;
              const isSeeAll = tab === 'SEE ALL';
              const isSpecial = tab === 'SPECIAL ART';

              let activeBg = 'linear-gradient(135deg, #4694d1, #3eaeba)';
              if (isSeeAll) activeBg = 'linear-gradient(135deg, #e6007e, #ff4081)';
              if (isSpecial) activeBg = 'linear-gradient(135deg, #9c27b0, #673ab7)';

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedFaction('ALL');
                  }}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    ...(isActive
                      ? {
                          background: activeBg,
                          color: '#FFFFFF',
                          border: 'none',
                          boxShadow: isSeeAll
                            ? '0 4px 20px rgba(230, 0, 126, 0.5)'
                            : '0 4px 18px rgba(70, 148, 209, 0.45)',
                          transform: 'scale(1.03)',
                        }
                      : {
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: 'rgba(255, 255, 255, 0.75)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                        }),
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Sub-filter chips for Faction / Phái */}
          {availableFactions.length > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                overflowX: 'auto',
                paddingBottom: 2,
                scrollbarWidth: 'none',
              }}
            >
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Môn Phái / Thế Lực:
              </span>
              <button
                onClick={() => setSelectedFaction('ALL')}
                style={{
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedFaction === 'ALL' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedFaction === 'ALL' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  border: selectedFaction === 'ALL' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                Tất cả ({allCardGroups.filter(g => {
                  if (activeTab === 'SEE ALL') return true;
                  if (activeTab === 'SPECIAL ART') return g.cards.length > 1;
                  const currentSec = CATEGORY_SECTIONS.find(s => s.tabName === activeTab);
                  return currentSec ? g.category === currentSec.key : true;
                }).length})
              </button>
              {availableFactions.map(faction => {
                const isFactionActive = selectedFaction === faction;
                const factionCount = allCardGroups.filter(g => g.faction === faction).length;
                return (
                  <button
                    key={faction}
                    onClick={() => setSelectedFaction(faction)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: isFactionActive ? 'rgba(70, 148, 209, 0.35)' : 'rgba(255, 255, 255, 0.04)',
                      color: isFactionActive ? '#87dff6' : 'rgba(255, 255, 255, 0.6)',
                      border: isFactionActive ? '1px solid #4694d1' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {faction} ({factionCount})
                  </button>
                );
              })}
            </div>
          )}
        </header>

        {/* ── Main Gallery Cards Grid (To & Full Kích Thước) ────── */}
        <main
          className="custom-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '36px 32px 64px',
            background: 'transparent',
          }}
        >
          <div style={{ maxWidth: 1480, margin: '0 auto', width: '100%' }}>
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 380,
                  gap: 16,
                  color: '#87dff6',
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(135, 223, 246, 0.4)',
                    boxShadow: '0 0 20px rgba(70, 148, 209, 0.3)',
                  }}
                >
                  <Sparkles size={28} className="text-[#87dff6] animate-spin" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.04em' }}>
                  Đang tải bộ sưu tập nhân vật Chibi Tiên Cảnh...
                </span>
              </div>
            ) : filteredCards.length > 0 ? (
              /* Enhanced Pokémon TCG card grid: 2 cols on mobile, up to 5 on desktop */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 justify-items-center">
                {filteredCards.map((group, idx) => (
                  <PerspectivePokemonCard
                    key={group.coreName + idx}
                    group={group}
                    index={idx}
                    onClick={() => setSelectedGroup(group)}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 320,
                  gap: 12,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                <Layers size={40} className="opacity-40" />
                <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                  Không tìm thấy nhân vật phù hợp
                </p>
                <button
                  onClick={() => {
                    setActiveTab('SEE ALL');
                    setSelectedFaction('ALL');
                    setSearchQuery('');
                  }}
                  style={{
                    marginTop: 8,
                    padding: '8px 20px',
                    borderRadius: 999,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Xem tất cả nhân vật
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}