import { notFound } from "next/navigation";
import { loadDeck } from "@/lib/deck-loader";
import { DeckView } from "@/components/deck/DeckView";

interface PageProps {
  params: Promise<{ scope: string }>;
}

export default async function DeckPage({ params }: PageProps) {
  const { scope } = await params;
  let slides;

  try {
    slides = await loadDeck(scope);
  } catch {
    notFound();
  }

  return <DeckView scope={scope} slides={slides} />;
}
