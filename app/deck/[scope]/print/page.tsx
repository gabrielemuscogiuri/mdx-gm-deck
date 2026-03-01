import { notFound } from "next/navigation";
import { loadDeck } from "@/lib/deck-loader";
import { PrintView } from "@/components/deck/PrintView";

interface PageProps {
  params: Promise<{ scope: string }>;
}

export default async function DeckPrintPage({ params }: PageProps) {
  const { scope } = await params;
  let slides;

  try {
    slides = await loadDeck(scope);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <PrintView slides={slides} />
    </main>
  );
}
