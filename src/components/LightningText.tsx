"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SparkPoint = { x: number; y: number; life: number; vx: number; vy: number };

interface LightningTextProps {
  text?: string;
  className?: string;
}

export default function LightningText({ text = "Chibi", className }: LightningTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const sparksRef = useRef<SparkPoint[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 600;
      const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 150;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w, h };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const fontSize = Math.min(Math.max(Math.floor(w * 0.075), 36), 72);
      ctx.save();
      ctx.font = `900 ${fontSize}px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 1. Heavy Outer Shadow & Outline (TCG Emblem Pop)
      ctx.shadowColor = "rgba(70, 148, 209, 0.35)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#1E293B";
      ctx.strokeText(text, w / 2, h / 2);

      // 2. Glowing Cyan Border
      ctx.shadowBlur = 0;
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#3eaeba";
      ctx.strokeText(text, w / 2, h / 2);

      // 3. Crisp Inner White Border
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FFFFFF";
      ctx.strokeText(text, w / 2, h / 2);

      // 4. Vibrant Modern TCG Gradient Fill
      const titleGradient = ctx.createLinearGradient(0, h / 2 - fontSize / 2, 0, h / 2 + fontSize / 2);
      titleGradient.addColorStop(0, "#FFFFFF");
      titleGradient.addColorStop(0.35, "#87DFF6");
      titleGradient.addColorStop(0.7, "#4694D1");
      titleGradient.addColorStop(1, "#2B708D");

      ctx.fillStyle = titleGradient;
      ctx.fillText(text, w / 2, h / 2);
      ctx.restore();

      if (Math.random() > 0.62) {
        const baseY = h / 2;
        const baseX = w / 2;
        const step = Math.max(20, Math.floor(fontSize * 0.75));
        const half = Math.floor(text.length / 2);
        for (let i = -half; i <= half; i++) {
          const x = baseX + i * step * 0.65 + (Math.random() * 6 - 3);
          const y = baseY + (Math.random() * 12 - 6);
          sparksRef.current.push({
            x,
            y,
            life: 1,
            vx: Math.random() * 1.8 - 0.9,
            vy: Math.random() * -1.8 - 0.3,
          });
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.03;
        if (s.life <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.shadowBlur = 16;
        ctx.shadowColor = "rgba(200, 121, 255, 0.82)";
        ctx.fillStyle = s.x < w / 2
          ? `rgba(216, 164, 255, ${Math.max(0, s.life)})`
          : `rgba(255, 232, 160, ${Math.max(0, s.life)})`;
        ctx.arc(s.x, s.y, 1.2 + s.life * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      frameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  return (
    <div className={cn("relative inline-flex items-center justify-center w-full h-[120px] bg-transparent overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full bg-transparent" />
    </div>
  );
}
