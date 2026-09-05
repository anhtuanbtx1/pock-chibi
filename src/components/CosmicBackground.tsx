'use client';

import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

const ROW1 = [
  '/assets/ton-ngo-khong.webp',
  '/assets/nhu-lai-phat-to-chibi-3d.webp',
  '/assets/lac-long-quan-chibi-3d.webp',
  '/assets/au-co-chibi-3d.webp',
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
];

const ROW2 = [
  '/assets/na-tra.webp',
  '/assets/thai-thuong-lao-quan.webp',
  '/assets/ban-co-chibi-3d-rui-dung.webp',
  '/assets/son-tinh-chibi-3d.webp',
  '/assets/thuy-tinh-doi-dau-son-tinh-chibi-3d.webp',
  '/assets/luu-bi.webp',
  '/assets/truong-phi.webp',
  '/assets/chu-du.webp',
  '/assets/truong-tam-phong-chibi-3d.webp',
  '/assets/kiem-ma.webp',
  '/assets/dong-phuong-bat-bai.webp',
  '/assets/lenh-ho-xung-chibi-3d.webp',
  '/assets/truong-vo-ky.webp',
  '/assets/quach-tinh.webp',
  '/assets/hoang-dung.webp',
  '/assets/ly-tieu-long-chibi-3d-vang.webp',
];

const CIRCLE_SIZE = 88;
const CIRCLE_GAP = 20;

function CardCircle({ src, size }: { src: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        background: '#FFFFFF',
        border: '3px solid #3eaeba',
        boxShadow: '0 8px 24px rgba(70,148,209,0.22), 0 0 16px rgba(135,223,246,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease',
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          display: 'block',
        }}
        draggable={false}
      />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

export default function CosmicBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const doubled1 = [...ROW1, ...ROW1];
  const doubled2 = [...ROW2, ...ROW2];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

        wrapper.querySelectorAll<HTMLElement>('.poke-parallax').forEach((el, i) => {
          const factor = (i % 3 + 1) * 0.8;
          el.style.transform = 'translate3d(' + (x * factor) + 'px, ' + (y * factor) + 'px, 0)';
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const rowStyle = (direction: 'left' | 'right'): CSSProperties => ({
    display: 'flex',
    gap: CIRCLE_GAP,
    width: 'max-content',
    animation: direction === 'left'
      ? 'pokeScrollLeft 35s linear infinite'
      : 'pokeScrollRight 40s linear infinite',
    paddingLeft: direction === 'right' ? CIRCLE_GAP : 0,
  });

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 35%, #F0F7FF 0%, #E2F0FD 50%, #FFFFFF 100%)',
      }}
    >
      {/* 3D Soft Light Orbs (Celestial Cyan, Water Blue, Ethereal Gold) */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%', width: 340, height: 340,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(135,223,246,0.35) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} className="poke-parallax animate-celestial-mist" />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%', width: 380, height: 380,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(70,148,209,0.25) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} className="poke-parallax animate-celestial-mist" />
      <div style={{
        position: 'absolute', top: '50%', right: '25%', width: 290, height: 290,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
        filter: 'blur(35px)',
      }} className="poke-parallax" />

      {/* Row 1 — Pokédex scrolling left */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: 0,
        right: 0,
        opacity: 0.82,
      }}>
        <div style={rowStyle('left')}>
          {doubled1.map((src, i) => (
            <CardCircle key={i} src={src} size={CIRCLE_SIZE} />
          ))}
        </div>
      </div>

      {/* Row 2 — Pokédex scrolling right */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        left: 0,
        right: 0,
        opacity: 0.82,
      }}>
        <div style={rowStyle('right')}>
          {doubled2.map((src, i) => (
            <CardCircle key={i} src={src} size={CIRCLE_SIZE} />
          ))}
        </div>
      </div>
    </div>
  );
}