import * as R from "remeda";
import matter from "gray-matter";
import type { SlideModel, SlideFrontmatter, SlideAnimation, ContentBlock } from "./types";

const SLIDE_SEP = "\n---\n";
const DEFAULT_ANIMATION: SlideAnimation = "fade";

function parseFrontmatter(slice: string): { frontmatter: SlideFrontmatter; content: string } {
  const parsed = matter(slice.trim());
  return {
    frontmatter: parsed.data as SlideFrontmatter,
    content: parsed.content.trim(),
  };
}

function extractTitleFromContent(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function parseStructuredContent(content: string): ContentBlock[] {
  const lines = content.split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i++;
      continue;
    }

    const h1 = trimmed.match(/^#\s+(.+)$/);
    const h2 = trimmed.match(/^##\s+(.+)$/);
    const h3 = trimmed.match(/^###\s+(.+)$/);
    const ul = trimmed.match(/^[-*]\s+(.+)$/);
    const ol = trimmed.match(/^\d+\.\s+(.+)$/);

    if (h1) {
      blocks.push({ type: "heading", level: 1, text: h1[1].trim() });
      i++;
      continue;
    }
    if (h2) {
      blocks.push({ type: "heading", level: 2, text: h2[1].trim() });
      i++;
      continue;
    }
    if (h3) {
      blocks.push({ type: "heading", level: 3, text: h3[1].trim() });
      i++;
      continue;
    }
    if (ul) {
      const items: string[] = [ul[1].trim()];
      i++;
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "list", items, ordered: false });
      continue;
    }
    if (ol) {
      const items: string[] = [ol[1].trim()];
      i++;
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "list", items, ordered: true });
      continue;
    }

    blocks.push({ type: "paragraph", text: trimmed });
    i++;
  }

  return blocks;
}

function buildSlide(segment: string, index: number): SlideModel {
  const { frontmatter, content } = parseFrontmatter(segment);
  const title =
    frontmatter.title ?? extractTitleFromContent(content) ?? `Slide ${index + 1}`;
  const animation = (frontmatter.animation ?? DEFAULT_ANIMATION) as SlideAnimation;
  const contentStructured = parseStructuredContent(content);

  return {
    id: `slide-${index}`,
    title,
    content,
    animation,
    contentStructured,
  };
}

/**
 * Splits raw MDX by `---`, parses frontmatter per slide, and returns the slide model array.
 * Uses Remeda for functional transformations.
 */
export function parseDeck(mdxSource: string): SlideModel[] {
  const segments = R.pipe(
    mdxSource,
    (s) => s.split(SLIDE_SEP),
    R.map((s) => s.trim()),
    R.filter((s) => s.length > 0)
  );

  return R.pipe(
    segments,
    R.map((segment, index) => buildSlide(segment, index))
  );
}
