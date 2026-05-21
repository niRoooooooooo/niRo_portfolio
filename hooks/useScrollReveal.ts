"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface ScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold: _t, once = true, margin = "-80px" } = options;
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once, margin } as Parameters<typeof useInView>[1]);

  return { ref, isInView };
}
