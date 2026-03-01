import { notFound } from "next/navigation";
import { loadDeck } from "@/lib/deck-loader";
import { PrintColumnView } from "@/components/deck/PrintColumnView";

interface PageProps {
  params: Promise<{ scope: string }>;
}

export default async function DeckExportPage({ params }: PageProps) {
  const { scope } = await params;
  let slides;

  try {
    slides = await loadDeck(scope);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <PrintColumnView slides={slides} />
    </main>
  );
}
