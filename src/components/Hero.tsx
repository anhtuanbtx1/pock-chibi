'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import TarotBookPopup from './TarotBookPopup';
import LightningText from './LightningText';

const FEATURED_CARDS = [
  '/assets/ton-ngo-khong.webp',
  '/assets/nhu-lai-phat-to-chibi-3d.webp',
  '/assets/lac-long-quan-chibi-3d.webp',
  '/assets/quan-vu.webp',
  '/assets/trieu-van.webp',
  '/assets/duong-qua.webp',
  '/assets/tieu-long-nu.webp',
  '/assets/nguyen-thuy-thien-ton.webp',
  '/assets/bo-kinh-van.webp',
  '/assets/nhiep-phong-chibi-3d.webp',
  '/assets/gia-cat-luong.webp',
  '/assets/lu-bo.webp',
  '/assets/thanh-giong-chibi-3d.webp',
  '/assets/tran-hung-dao-chibi-3d.webp',
  '/assets/duong-tien.webp',
  '/assets/na-tra.webp',
];

// ── 3D Chibi Tiên Cảnh Blue Ink-Wash Yin-Yang Component ─────────────────
function CelestialYinYangArray() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* 1. Soft Ambient Blue Aura Glow (Background) */}
      <div
        className="animate-celestial-mist"
        style={{
          position: 'absolute',
          width: 580,
          height: 580,
          left: -290,
          top: -290,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(135, 223, 246, 0.45) 0%, rgba(70, 148, 209, 0.22) 50%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Outer Dashed Celestial Ring */}
      <div
        className="animate-xianxia-counter"
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          left: -260,
          top: -260,
          borderRadius: '50%',
          border: '2px dashed rgba(62, 174, 186, 0.7)',
          boxShadow: '0 0 35px rgba(62, 174, 186, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Pure Vector Celestial Yin-Yang Emblem */}
      <svg
        viewBox="0 0 100 100"
        className="animate-celestial-spin"
        style={{
          position: 'absolute',
          width: 460,
          height: 460,
          left: -230,
          top: -230,
          filter: 'drop-shadow(0 0 35px rgba(62, 174, 186, 0.85)) drop-shadow(0 0 15px rgba(135, 223, 246, 0.9))',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(62, 174, 186, 0.6)" strokeWidth="1.5" />
        <path
          d="M 50 2 A 48 48 0 0 1 50 98 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 2 Z"
          fill="url(#blueYinYangGrad1)"
        />
        <path
          d="M 50 98 A 48 48 0 0 1 50 2 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 98 Z"
          fill="url(#blueYinYangGrad2)"
        />
        <circle cx="50" cy="26" r="6" fill="#FFFFFF" filter="drop-shadow(0 0 4px #87dff6)" />
        <circle cx="50" cy="74" r="6" fill="#0d2538" filter="drop-shadow(0 0 4px #3eaeba)" />
        <defs>
          <linearGradient id="blueYinYangGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#87dff6" />
            <stop offset="100%" stopColor="#3eaeba" />
          </linearGradient>
          <linearGradient id="blueYinYangGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a192f" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Hero() {
  const searchParams = useSearchParams();
  const [cardIdx, setCardIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    if (searchParams?.get('gallery') === 'open') {
      setBookOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setBookOpen(false);
    if (typeof window !== 'undefined' && window.location.search.includes('gallery=open')) {
      window.history.replaceState(null, '', '/');
    }
  };

  useEffect(() => {
    setCardIdx(Math.floor(Math.random() * FEATURED_CARDS.length));
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCardIdx(i => {
          let next;
          do { next = Math.floor(Math.random() * FEATURED_CARDS.length); } while (next === i);
          return next;
        });
        setVisible(true);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        textAlign: 'center',
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>
        {/* Title */}
        <LightningText
          text="Chibi"
          className="mb-4 h-[72px] sm:h-[110px] w-full max-w-[820px] mx-auto z-10"
        />

        {/* Featured Card Wrapper with Blue Ink-Wash Yin-Yang Array centered right behind card */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 28 }}>
          {/* 3D Chibi Tiên Cảnh Blue Ink-Wash Yin-Yang Array */}
          <CelestialYinYangArray />

          {/* Featured Card */}
          <motion.div
            onClick={() => setBookOpen(true)}
            className="group"
            style={{ cursor: 'pointer', position: 'relative', zIndex: 10 }}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            <div
              className="tcg-card-hover"
              style={{
                width: 180,
                aspectRatio: '2/3',
                borderRadius: 18,
                overflow: 'hidden',
                border: '3px solid #4694d1',
                boxShadow: '0 16px 48px rgba(70,148,209,0.35), 0 0 0 6px rgba(70,148,209,0.08)',
                position: 'relative',
                background: '#DDE7F5',
              }}
            >
              <img
                src={FEATURED_CARDS[cardIdx]}
                alt="Featured card"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              />
              <div className="card-shimmer-overlay" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 60%)',
                pointerEvents: 'none', borderRadius: 15, zIndex: 6,
              }} />
              <div style={{
                position: 'absolute', bottom: 8, left: 0, right: 0,
                textAlign: 'center', pointerEvents: 'none', zIndex: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              }}>
                <span className="animate-rotate-icon inline-block text-yellow-300">✦</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.95)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}>
                  Click to explore
                </span>
                <span className="animate-rotate-icon inline-block text-yellow-300">✦</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full Frame Popup */}
        <TarotBookPopup open={bookOpen} onClose={handleClose} />
      </div>
    </div>
  );
}