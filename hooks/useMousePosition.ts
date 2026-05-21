"use client";

import { useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
  normX: number; // -1 to 1
  normY: number; // -1 to 1
}

/**
 * Returns a ref holding the latest mouse position.
 * Using a ref (not state) avoids re-renders on every mouse move —
 * the canvas reads it directly in the rAF loop.
 */
export function useMousePosition(): React.RefObject<MousePosition> {
  const posRef = useRef<MousePosition>({ x: 0, y: 0, normX: 0, normY: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
        normX: (e.clientX / window.innerWidth) * 2 - 1,
        normY: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return posRef;
}
