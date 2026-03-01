import { readFile } from "fs/promises";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import * as R from "remeda";
import { parseDeck } from "@/lib/mdx";
import type { SlideModel } from "@/lib/mdx";

const DECKS_DIR = "content/decks";

export interface SlideWithSource extends SlideModel {
  compiledSource: Awaited<ReturnType<typeof serialize>>;
}

export async function loadDeck(scope: string): Promise<SlideWithSource[]> {
  const base = process.cwd();
  const filePath = path.join(base, DECKS_DIR, scope, "deck.mdx");
  const raw = await readFile(filePath, "utf-8");
  const slides = parseDeck(raw);

  const withSource = await Promise.all(
    R.pipe(
      slides,
      R.map(async (slide) => {
        const compiledSource = await serialize(slide.content);
        return { ...slide, compiledSource } satisfies SlideWithSource;
      })
    )
  );

  return withSource;
}

export async function listScopes(): Promise<string[]> {
  const base = process.cwd();
  const decksPath = path.join(base, DECKS_DIR);
  const { readdir } = await import("fs/promises");
  let entries: { isDirectory: () => boolean; name: string }[];
  try {
    const raw = await readdir(decksPath, { withFileTypes: true });
    entries = Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
  const names = R.pipe(
    entries,
    R.filter((e) => e.isDirectory()),
    R.map((e) => e.name)
  );
  return R.sortBy(names, (s) => s);
}
