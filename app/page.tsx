import Link from "next/link";
import * as R from "remeda";
import { listScopes } from "@/lib/deck-loader";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const scopes = await listScopes();

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Presentazioni
        </h1>
        <p className="mt-2 text-muted-foreground">
          Scegli un deck per visualizzarlo. Usa le frecce ← → per navigare.
        </p>
        <ul className="mt-8 flex flex-col gap-3">
          {R.pipe(
            scopes,
            R.map((scope) => (
              <li key={scope}>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/deck/${scope}`}>{scope}</Link>
                </Button>
              </li>
            ))
          )}
        </ul>
        {scopes.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            Nessun deck trovato. Aggiungi cartelle in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">content/decks/</code>.
          </p>
        )}
      </main>
    </div>
  );
}
