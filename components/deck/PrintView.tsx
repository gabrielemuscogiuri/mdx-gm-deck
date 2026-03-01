"use client";

import { useEffect } from "react";
import type { SlideWithSource } from "@/lib/deck-loader";
import { SlideContent } from "./SlideContent";

interface PrintViewProps {
  slides: SlideWithSource[];
}

export function PrintView({ slides }: PrintViewProps) {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="print-view bg-background">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="slide-page flex aspect-[3/2] w-full flex-col items-center justify-center bg-background p-6"
        >
          <SlideContent compiledSource={slide.compiledSource} />
        </div>
      ))}
    </div>
  );
}
