import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  MessageCircle,
  Play,
  StickyNote,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScaledSlide } from "@/slides/ScaledSlide";
import { WHATSAPP_URL } from "@/slides/offer";
import { SlideView, slides } from "@/slides/registry";
import { AlfaMark } from "@/slides/SlideLayout";
import { useSwipe } from "@/slides/useSwipe";

type DeckSearch = { slide?: number };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): DeckSearch => {
    const n = Number(search["slide"]);
    return Number.isInteger(n) && n >= 1 ? { slide: n } : {};
  },
  head: () => ({
    meta: [
      { title: "ALFA — BPO financeiro para prestadores de serviço" },
      {
        name: "description",
        content:
          "Apresentação comercial da ALFA: gestão financeira terceirizada para prestadores de serviço.",
      },
      { property: "og:title", content: "ALFA — BPO financeiro para prestadores de serviço" },
      {
        property: "og:description",
        content: "Você cuida dos clientes. A ALFA cuida do seu negócio.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://lovable.app",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://lovable.app",
      },
    ],
  }),
  component: Deck,
});

function Deck() {
  const { slide } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const total = slides.length;
  const index = Math.min(Math.max((slide ?? 1) - 1, 0), total - 1);

  const [gridOpen, setGridOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.min(Math.max(i, 0), total - 1);
      navigate({ search: { slide: next + 1 }, replace: true });
    },
    [navigate, total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const swipe = useSwipe(next, prev);

  const startPresenting = useCallback(() => {
    setGridOpen(false);
    setPresenting(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);
  const stopPresenting = useCallback(() => {
    setPresenting(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 2200);
  }, []);

  useEffect(() => {
    document.title = `${index + 1}/${total} — ${slides[index]?.title} · ALFA`;
    thumbRefs.current[index]?.scrollIntoView({ block: "nearest" });
  }, [index, total]);

  useEffect(() => {
    const onFs = () => {
      if (!document.fullscreenElement) setPresenting(false);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (presenting) wake();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [presenting, wake]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(total - 1);
      else if (e.key === "F5" || e.key.toLowerCase() === "f") {
        e.preventDefault();
        startPresenting();
      } else if (e.key.toLowerCase() === "g" && !presenting) setGridOpen((v) => !v);
      else if (e.key.toLowerCase() === "n" && !presenting) setNotesOpen((v) => !v);
      else if (e.key === "Escape") {
        if (presenting) stopPresenting();
        else setGridOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total, presenting, startPresenting, stopPresenting]);

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      {/* Toolbar */}
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3 sm:px-5">
        <div className="flex items-center gap-2 text-base font-extrabold tracking-tight">
          <AlfaMark />
          <span>ALFA</span>
          <span className="hidden font-medium text-muted-foreground md:inline">
            · Gestão financeira para prestadores de serviço
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ver todos os slides"
            aria-pressed={gridOpen}
            onClick={() => setGridOpen((v) => !v)}
          >
            <LayoutGrid />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notas do apresentador"
            aria-pressed={notesOpen}
            className={cn(notesOpen && "bg-accent")}
            onClick={() => setNotesOpen((v) => !v)}
          >
            <StickyNote />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Exportar PDF" asChild>
            <a href="/print" target="_blank" rel="noreferrer">
              <Download />
            </a>
          </Button>
          <Button onClick={startPresenting} className="ml-1">
            <Play />
            <span className="hidden sm:inline">Apresentar</span>
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Thumbnails */}
        <aside className="hidden w-60 shrink-0 flex-col gap-3 overflow-y-auto border-r p-4 md:flex">
          {slides.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              onClick={() => goTo(i)}
              className="group flex items-start gap-2 text-left"
              aria-label={`Ir para o slide ${i + 1}: ${s.title}`}
            >
              <span
                className={cn(
                  "w-5 pt-1 text-xs tabular-nums text-muted-foreground",
                  i === index && "text-primary",
                )}
              >
                {i + 1}
              </span>
              <ScaledSlide
                className={cn(
                  "aspect-video flex-1 rounded-md ring-2 ring-transparent transition",
                  i === index ? "ring-primary" : "group-hover:ring-border",
                )}
              >
                <SlideView index={i} />
              </ScaledSlide>
            </button>
          ))}
        </aside>

        {/* Canvas */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1" {...swipe}>
            <ScaledSlide framed className="absolute inset-3 sm:inset-8">
              <SlideView index={index} />
            </ScaledSlide>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Slide anterior"
              onClick={prev}
              disabled={index === 0}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full md:inline-flex"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Próximo slide"
              onClick={next}
              disabled={ind
