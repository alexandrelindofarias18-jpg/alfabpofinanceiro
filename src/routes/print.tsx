import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SlideView, slides } from "@/slides/registry";

export const Route = createFileRoute("/print")({
  head: () => ({
    meta: [
      { title: "Exportar PDF — Apresentação ALFA" },
      { name: "description", content: "Versão para impressão da apresentação comercial da ALFA." },
      { property: "og:title", content: "Exportar PDF — Apresentação ALFA" },
      { property: "og:description", content: "Versão para impressão da apresentação da ALFA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrintDeck,
});

function PrintDeck() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await document.fonts?.ready;
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.complete
            ? null
            : new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              }),
        ),
      );
      setTimeout(() => {
        if (!cancelled) window.print();
      }, 400);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-stage">
      <p className="sticky top-0 z-10 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground print:hidden">
        Na janela de impressão, escolha “Salvar como PDF” como destino.
      </p>
      {slides.map((s, i) => (
        <div key={s.id} className="print-slide">
          <SlideView index={i} />
        </div>
      ))}
    </div>
  );
}
