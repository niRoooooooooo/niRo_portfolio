"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  c: [number, number, number];
  a: number;
  ph: number;
}

interface Orb {
  x: number; y: number; r: number;
  c: [number, number, number];
  s: number; amp: number;
}

const COLORS: [number, number, number][] = [
  [110, 87, 255],
  [255, 107, 107],
  [0, 212, 170],
  [240, 237, 232],
];

const GX = 13;
const GY = 9;
const NPART = 160;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.parentElement?.addEventListener("mousemove", onMove);
    canvas.parentElement?.addEventListener("mouseleave", onLeave);

    const parts: Particle[] = Array.from({ length: NPART }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 2.0 + 0.8,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: Math.random() * 0.42 + 0.27,
      ph: Math.random() * Math.PI * 2,
    }));

    const orbs: Orb[] = [
      { x: 0.18, y: 0.45, r: 340, c: [110, 87, 255], s: 0.00018, amp: 0.055 },
      { x: 0.78, y: 0.32, r: 260, c: [255, 107, 107], s: 0.00022, amp: 0.05 },
      { x: 0.52, y: 0.75, r: 290, c: [0, 212, 170],   s: 0.00014, amp: 0.04 },
    ];

    const snips = ["async", "fn()", "</>", "=>", "{...}", "[]", "&&", "::", "null", "0x1f"];

    const drawMesh = (t: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const pts: { x: number; y: number }[] = [];
      for (let gy = 0; gy <= GY; gy++) {
        for (let gx = 0; gx <= GX; gx++) {
          const bx = (gx / GX) * W;
          const by = (gy / GY) * H;
          const dx = mx / W - gx / GX;
          const dy = my / H - gy / GY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 0.22 - dist) / 0.22;
          const ox = Math.sin(t * 0.0009 + gx * 0.55 + gy * 0.38) * 11;
          const oy = Math.cos(t * 0.0007 + gy * 0.65 + gx * 0.28) * 11;
          const pmx = (mx / W - 0.5) * pull * 40;
          const pmy = (my / H - 0.5) * pull * 40;
          pts.push({ x: bx + ox + pmx, y: by + oy + pmy });
        }
      }

      for (let gy = 0; gy <= GY; gy++) {
        ctx.beginPath();
        for (let gx = 0; gx <= GX; gx++) {
          const p = pts[gy * (GX + 1) + gx];
          gx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        const a = 0.042 + Math.sin(t * 0.0011 + gy) * 0.014;
        ctx.strokeStyle = `rgba(110,87,255,${a})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      for (let gx = 0; gx <= GX; gx++) {
        ctx.beginPath();
        for (let gy = 0; gy <= GY; gy++) {
          const p = pts[gy * (GX + 1) + gx];
          gy === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        const a = 0.034 + Math.cos(t * 0.001 + gx) * 0.011;
        ctx.strokeStyle = `rgba(110,87,255,${a})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - dist / 163);
        const alpha = 0.27 + near * 0.81;
        const radius = 1.5 + near * 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          near > 0.25
            ? `rgba(0,212,170,${alpha})`
            : `rgba(110,87,255,${alpha})`;
        ctx.fill();
      }
    };

    const drawOrbs = (t: number) => {
      orbs.forEach((o, i) => {
        const cx = (o.x + Math.sin(t * o.s * 1000 + i) * o.amp) * W;
        const cy = (o.y + Math.cos(t * o.s * 800 + i * 1.4) * o.amp) * H;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        g.addColorStop(0, `rgba(${o.c},0.30)`);
        g.addColorStop(0.5, `rgba(${o.c},0.13)`);
        g.addColorStop(1, `rgba(${o.c},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
    };

    const drawParticles = (t: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      parts.forEach((p) => {
        p.x += p.vx + Math.sin(t * 0.0005 + p.ph) * 0.00014;
        p.y += p.vy + Math.cos(t * 0.0004 + p.ph) * 0.00011;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * W;
        const py = p.y * H;
        const dx = mx - px;
        const dy = my - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - dist / 125);
        const alpha = p.a + near * 0.58;
        const rad = p.r + near * 4;

        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${alpha})`;
        ctx.fill();

        parts.forEach((q) => {
          if (q === p) return;
          const ddx = q.x * W - px;
          const ddy = q.y * H - py;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < 100) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(q.x * W, q.y * H);
            ctx.strokeStyle = `rgba(${p.c},${(1 - dd / 100) * 0.29})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });
    };

    const drawCode = (t: number) => {
      ctx.font = "14px 'DM Mono', monospace";
      snips.forEach((s, i) => {
        const x = ((i * 0.095 + 0.03 + Math.sin(t * 0.00038 + i) * 0.038)) * W;
        const y = ((i * 0.082 + 0.06 + Math.cos(t * 0.00029 + i * 1.6) * 0.032)) * H;
        const a = 0.13 + Math.sin(t * 0.0009 + i) * 0.057;
        ctx.fillStyle = `rgba(110,87,255,${a})`;
        ctx.fillText(s, x, y);
      });
    };

    const drawCorners = () => {
      const size = 22;
      const pad = 25;
      ctx.strokeStyle = "rgba(170,150,255,0.6)";
      ctx.lineWidth = 1;

      ctx.beginPath(); ctx.moveTo(pad + size, pad); ctx.lineTo(pad, pad); ctx.lineTo(pad, pad + size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W - pad - size, pad); ctx.lineTo(W - pad, pad); ctx.lineTo(W - pad, pad + size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad + size, H - pad); ctx.lineTo(pad, H - pad); ctx.lineTo(pad, H - pad - size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W - pad - size, H - pad); ctx.lineTo(W - pad, H - pad); ctx.lineTo(W - pad, H - pad - size); ctx.stroke();
    };

    const drawCoords = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const xPct = mx < 0 ? "00.00" : ((mx / W) * 100).toFixed(2);
      const yPct = my < 0 ? "00.00" : ((my / H) * 100).toFixed(2);
      ctx.font = "19px 'DM Mono', monospace";
      ctx.fillStyle = "rgba(170,150,255,0.6)";
      ctx.textAlign = "right";
      ctx.fillText(`${xPct} / ${yPct}`, W - 50, H - 50);
      ctx.textAlign = "left";
    };

    const frame = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      drawOrbs(ts);
      drawMesh(ts);
      drawParticles(ts);
      drawCode(ts);
      drawCorners();
      drawCoords();
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
