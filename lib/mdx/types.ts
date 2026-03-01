export type SlideAnimation = "fade" | "slideLeft" | "slideRight" | "slideUp" | "slideDown" | "none";

export interface SlideFrontmatter {
  title?: string;
  animation?: SlideAnimation;
}

export interface SlideModel {
  id: string;
  title: string;
  content: string;
  animation: SlideAnimation;
  /** Structured blocks for PDF (paragraphs, headings, lists). Filled by parser. */
  contentStructured?: ContentBlock[];
}

export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered: boolean };
