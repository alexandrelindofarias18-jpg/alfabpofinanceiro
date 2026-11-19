import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Renders 1920x1080 content scaled to fit its container. */
export function ScaledSlide({
  children,
  className,
  framed,
}: {
  children: ReactNode;
  className?: string;
  framed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / 1920, height / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        className={cn("slide-wrapper", framed && "slide-shadow")}
        style={{ "--scale": scale, opacity: scale ? 1 : 0 } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
