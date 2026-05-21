"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const COLS = 20;
const ROWS = 14;
const PARTICLE_COUNT = 80;
const INFLUENCE_RADIUS = 180;
const SPRING = 0.04;
const DAMPING = 0.88;

const PURPLE = "110, 87, 255";
const CORAL  = "255, 107, 107";
const TEAL   = "0, 212, 170";

const CODE_SNIPPETS = [
  "const x = await fetch('/api/events')",
  "fn distribute(tasks: Vec<Task>) -> Result<()>",
  "SELECT * FROM events WHERE ts > NOW() - '1h'",
  "docker build -t app:latest --platform linux/amd64 .",
  "type Handler[T] = (ctx: Context) => Promise<T>",
  "kubectl rollout status deploy/api-server",
  "git commit -m 'feat: add streaming response'",
  "npx tsc --noEmit && next build",
  "redis-cli XADD events '*' key value",
  "terraform apply -auto-approve",
  "import { create } from 'zustand'",
  "go test ./... -race -count=1",
];

interface GridPoint {
  bx: number; by: number; // base position
  cx: number; cy: number; // current position
  vx: number; vy: number; // velocity
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  color: string;
}

interface Snippet {
  text: string;
  x: number; y: number;
  alpha: number;
  alphaDir: number;
  speed: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useMousePosition();
  const rafRef = useRef<number>(0);

  const buildGrid = useCallback((w: number, h: number): GridPoint[] => {
    const pts: GridPoint[] = [];
    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        const bx = (c / COLS) * w;
        const by = (r / ROWS) * h;
        pts.push({ bx, by, cx: bx, cy: by, vx: 0, vy: 0 });
      }
    }
    return pts;
  }, []);

  const buildParticles = useCallback((w: number, h: number): Particle[] => {
    const colors = [PURPLE, CORAL, TEAL];
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      color: colors[Math.floor(Math.random() * 3)],
    }));
  }, []);

  const buildSnippets = useCallback((w: number, h: number): Snippet[] => {
    return CODE_SNIPPETS.map((text) => ({
      text,
      x: Math.random() * w * 0.8 + w * 0.1,
      y: Math.random() * h * 0.8 + h * 0.1,
      alpha: Math.random() * 0.06 + 0.02,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * 0.003 + 0.001,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let grid = buildGrid(w, h);
    let particles = buildParticles(w, h);
    let snippets = buildSnippets(w, h);

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      grid = buildGrid(w, h);
      particles = buildParticles(w, h);
      snippets = buildSnippets(w, h);
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // ── Orbital glows ────────────────────────────────────────────────────
      const glows: [number, number, string, number][] = [
        [w * 0.25, h * 0.35, PURPLE, 320],
        [w * 0.75, h * 0.6,  CORAL,  260],
        [w * 0.5,  h * 0.8,  TEAL,   200],
      ];
      for (const [gx, gy, color, r] of glows) {
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
        grad.addColorStop(0, `rgba(${color}, 0.12)`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(gx, gy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Code snippets ────────────────────────────────────────────────────
      ctx.font = "11px 'DM Mono', monospace";
      for (const s of snippets) {
        s.alpha += s.alphaDir * s.speed;
        if (s.alpha > 0.08) s.alphaDir = -1;
        if (s.alpha < 0.01) s.alphaDir = 1;
        ctx.fillStyle = `rgba(240, 237, 232, ${s.alpha})`;
        ctx.fillText(s.text, s.x, s.y);
      }

      // ── Mesh grid ────────────────────────────────────────────────────────
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      for (const pt of grid) {
        const dx = mx - pt.bx;
        const dy = my - pt.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INFLUENCE_RADIUS) {
          const force = (1 - dist / INFLUENCE_RADIUS) * 18;
          pt.vx += (dx / dist) * force;
          pt.vy += (dy / dist) * force;
        }
        // spring back to base
        pt.vx += (pt.bx - pt.cx) * SPRING;
        pt.vy += (pt.by - pt.cy) * SPRING;
        pt.vx *= DAMPING;
        pt.vy *= DAMPING;
        pt.cx += pt.vx;
        pt.cy += pt.vy;
      }

      // draw horizontal grid lines
      const stride = COLS + 1;
      ctx.strokeStyle = `rgba(${PURPLE}, 0.06)`;
      ctx.lineWidth = 0.5;
      for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c <= COLS; c++) {
          const p = grid[r * stride + c];
          c === 0 ? ctx.moveTo(p.cx, p.cy) : ctx.lineTo(p.cx, p.cy);
        }
        ctx.stroke();
      }
      // draw vertical grid lines
      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        for (let r = 0; r <= ROWS; r++) {
          const p = grid[r * stride + c];
          r === 0 ? ctx.moveTo(p.cx, p.cy) : ctx.lineTo(p.cx, p.cy);
        }
        ctx.stroke();
      }

      // ── Particles + connections ──────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha > 0.55) p.alphaDir = -1;
        if (p.alpha < 0.08) p.alphaDir = 1;
      }

      // draw connections
      const MAX_DIST = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.12;
            ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      // ── Vignette ─────────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h);
      vig.addColorStop(0, "rgba(10, 10, 15, 0)");
      vig.addColorStop(1, "rgba(10, 10, 15, 0.85)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // ── Corner brackets ───────────────────────────────────────────────────
      const bSize = 24;
      const bGap = 20;
      ctx.strokeStyle = `rgba(${PURPLE}, 0.3)`;
      ctx.lineWidth = 1;
      const corners: [number, number, number, number][] = [
        [bGap, bGap, 1, 1],
        [w - bGap, bGap, -1, 1],
        [bGap, h - bGap, 1, -1],
        [w - bGap, h - bGap, -1, -1],
      ];
      for (const [cx2, cy2, sx, sy] of corners) {
        ctx.beginPath();
        ctx.moveTo(cx2 + sx * bSize, cy2);
        ctx.lineTo(cx2, cy2);
        ctx.lineTo(cx2, cy2 + sy * bSize);
        ctx.stroke();
      }

      // ── Live coordinate display ───────────────────────────────────────────
      ctx.font = "10px 'DM Mono', monospace";
      ctx.fillStyle = `rgba(${PURPLE}, 0.4)`;
      ctx.textAlign = "right";
      ctx.fillText(
        `${Math.round(mousePos.current.x)}, ${Math.round(mousePos.current.y)}`,
        w - bGap,
        h - bGap
      );
      ctx.textAlign = "left";

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [buildGrid, buildParticles, buildSnippets, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
