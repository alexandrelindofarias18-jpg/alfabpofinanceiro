import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SlideIndexContext = createContext<{ index: number; total: number }>({
  index: 0,
  total: 0,
});

export type SlideTone = "ink" | "paper" | "lime";

const toneClass: Record<SlideTone, string> = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  lime: "bg-lime text-ink",
};

export function AlfaMark({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("alfa-mark", inverted ? "bg-ink text-lime" : "bg-lime text-ink", className)}
    >
      α
    </span>
  );
}

export function SlideLayout({
  tone = "paper",
  chrome = true,
  className,
  children,
}: {
  tone?: SlideTone;
  chrome?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { index, total } = useContext(SlideIndexContext);
  return (
    <div className={cn("slide-content", toneClass[tone], className)}>
      {children}
      {chrome && (
        <div className="slide-footer pointer-events-none absolute inset-x-24 bottom-12 flex items-center justify-between">
          <span className="flex items-center gap-3 font-semibold opacity-70">
            <AlfaMark inverted={tone === "lime"} />
            ALFA · BPO Financeiro
          </span>
          <span className="slide-page tabular-nums opacity-60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
