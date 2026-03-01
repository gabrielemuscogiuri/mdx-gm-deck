"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { nextIndex, prevIndex } from "@/lib/deck-state";
import type { SlideWithSource } from "@/lib/deck-loader";
import { SlideWrapper } from "./SlideWrapper";
import { SlideContent } from "./SlideContent";
import { Button } from "@/components/ui/button";

interface DeckViewProps {
  scope: string;
  slides: SlideWithSource[];
}

export function DeckView({ scope, slides }: DeckViewProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const slide = slides[current] ?? null;

  const goNext = useCallback(() => {
    setCurrent((c) => nextIndex(c, total));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((c) => prevIndex(c, total));
  }, [total]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  if (total === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Nessuna slide in questo deck.</p>
      </div>
    );
  }

  const openExport = useCallback(() => {
    window.open(`/deck/${scope}/export`, "_blank", "noopener");
  }, [scope]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-muted/50">
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">← Indietro</Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            {current + 1} / {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={openExport}>
            Esporta
          </Button>
          <Button variant="outline" size="sm" onClick={goPrev} disabled={current === 0}>
            ←
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={current >= total - 1}
          >
            →
          </Button>
        </div>
      </div>

      <div className="flex h-[100dvh] w-[100vw] flex-shrink-0 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {slide && (
            <SlideWrapper key={slide.id} animation={slide.animation}>
              <SlideContent compiledSource={slide.compiledSource} />
            </SlideWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
