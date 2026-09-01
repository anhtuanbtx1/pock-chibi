'use client';

import React from 'react';

export default function CelestialYinYangBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#070b14]"
      aria-hidden="true"
    >
      {/* Deep Cosmic Radial Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, #162640 0%, #0d1626 45%, #070b14 100%)',
        }}
      />

      {/* Luminous Ambient Halo Behind Yin-Yang */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[90px] opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(70,148,209,0.45) 0%, rgba(239,193,109,0.2) 50%, transparent 70%)',
          animationDuration: '6s',
        }}
      />

      {/* Floating Ethereal Orbs */}
      <div
        className="absolute top-[18%] left-[15%] w-[420px] h-[420px] rounded-full blur-[100px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #4694d1 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[20%] right-[12%] w-[460px] h-[460px] rounded-full blur-[110px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #efc16d 0%, transparent 70%)',
        }}
      />

      {/* Central Animated Yin-Yang Emblem from media_1787939166360.jpg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] flex items-center justify-center">
        {/* Outer Rotating Bagua Ring Aura */}
        <div
          className="absolute inset-0 rounded-full border border-cyan-400/20 shadow-[0_0_50px_rgba(70,148,209,0.15)] animate-[spin_120s_linear_infinite]"
        />
        <div
          className="absolute inset-[24px] rounded-full border border-amber-300/15 animate-[spin_90s_linear_infinite_reverse]"
        />

        {/* Yin-Yang Image with Continuous Smooth Rotation & Subtle Breathing */}
        <div
          className="relative w-[85%] h-[85%] flex items-center justify-center animate-[spin_75s_linear_infinite]"
          style={{
            transformOrigin: 'center center',
          }}
        >
          <img
            src="/assets/media_1787939166360.webp"
            alt="Thái Cực Âm Dương"
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(70,148,209,0.5)] opacity-60"
            style={{
              maskImage: 'radial-gradient(circle at center, black 50%, transparent 68%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 68%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

      {/* Star Dust / Celestial Light Mesh Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Vignette Edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(7, 11, 20, 0.75) 100%)',
        }}
      />
    </div>
  );
}
