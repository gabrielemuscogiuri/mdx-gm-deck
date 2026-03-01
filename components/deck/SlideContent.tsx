"use client";

import { MDXRemote } from "next-mdx-remote";

interface SlideContentProps {
  compiledSource: React.ComponentProps<typeof MDXRemote>;
}

export function SlideContent({ compiledSource }: SlideContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none mx-auto px-6 py-4">
      <MDXRemote {...compiledSource} />
    </div>
  );
}
