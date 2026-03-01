"use client";

import { useEffect } from "react";
import type { SlideWithSource } from "@/lib/deck-loader";
import { SlideContent } from "./SlideContent";

interface PrintColumnViewProps {
  slides: SlideWithSource[];
}

export function PrintColumnView({ slides }: PrintColumnViewProps) {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="print-column-view flex flex-col gap-6 bg-background p-6">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="slide-column-item flex aspect-[3/2] w-full flex-col items-center justify-center rounded-lg border border-border bg-background p-6"
        >
          <SlideContent compiledSource={slide.compiledSource} />
        </div>
      ))}
    </div>
  );
}
