"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Crosshair } from "./visual";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react/dist/ssr";

export type HeroSlide = { src: string; alt: string; location: string };

/* Vertical slide direction (y translate) for the AnimatePresence swap. */
const slideVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%" }),
  center: { y: "0%" },
  exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%" }),
};

export function HeroCarousel({ slides }: { slides: readonly HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const count = slides.length;
  const canPrev = index > 0;
  const canNext = index < count - 1;

  // Mirror of `index` so the wheel listener (bound once) can tell whether a
  // wheel direction is valid without re-binding on every change.
  const indexRef = useRef(index);
  indexRef.current = index;

  const paginate = (dir: number) =>
    setPage(([i]) => {
      const next = i + dir;
      if (next < 0 || next >= count) return [i, dir]; // clamped — no wrap
      return [next, dir];
    });
  const goTo = (target: number) =>
    setPage(([i]) => [target, target === i ? 0 : target > i ? 1 : -1]);

  // Mouse-wheel switching: a vertical wheel over the frame advances one slide
  // (throttled to one per gesture). Non-passive so preventDefault works. At
  // either end the blocked direction is released — the wheel passes through to
  // the page so the reader can scroll past the carousel without moving the
  // cursor.
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = frameRef.current;
    if (!el || count <= 1) return;
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // horizontal → page
      const dir = e.deltaY > 0 ? 1 : -1;
      const i = indexRef.current;
      const canMove = dir > 0 ? i < count - 1 : i > 0;
      if (!canMove) return; // at an end in this direction → let the page scroll
      e.preventDefault();
      if (locked || e.deltaY === 0) return;
      locked = true;
      setPage(([cur]) => [
        Math.min(count - 1, Math.max(0, cur + dir)),
        dir,
      ]);
      window.setTimeout(() => {
        locked = false;
      }, 400);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count]);

  // Touch swipe (mobile): a vertical swipe advances one slide. Non-passive
  // touchmove so preventDefault can claim the gesture; at either end the
  // blocked direction is released so the page scrolls past the carousel
  // (same rule as the wheel). Horizontal movement is always left to the page.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || count <= 1) return;
    let startX = 0;
    let startY = 0;
    let done = false; // gesture classified
    let capturing = false; // this vertical swipe is ours to handle
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
      done = false;
      capturing = false;
    };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (!done) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; // wait for movement
        done = true;
        if (Math.abs(dy) > Math.abs(dx)) {
          const dir = dy < 0 ? 1 : -1; // swipe up → next, down → prev
          const i = indexRef.current;
          capturing = dir > 0 ? i < count - 1 : i > 0; // claim only if it can move
        }
      }
      if (capturing) e.preventDefault();
    };
    const onEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dy = t ? t.clientY - startY : 0;
      const wasCapturing = capturing;
      done = false;
      capturing = false;
      if (!wasCapturing || !t || Math.abs(dy) < 40) return; // tap / tiny move
      const dir = dy < 0 ? 1 : -1;
      setPage(([i]) => {
        const next = i + dir;
        if (next < 0 || next >= count) return [i, dir];
        return [next, dir];
      });
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [count]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      if (!canNext) return;
      e.preventDefault();
      paginate(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      if (!canPrev) return;
      e.preventDefault();
      paginate(-1);
    }
  };

  return (
    <div
      ref={frameRef}
      className="hatch-mat relative ml-auto w-full max-w-[420px]"
    >
      <figure
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-roledescription="carousel"
        aria-label="Fei Liu — selected frames"
        className="group relative aspect-[4/5] w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Crosshair className="left-2 top-2" />
        <Crosshair className="right-2 top-2" />

        {/* Slide viewport */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.65, 0, 0.35, 1] }
              }
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slides[index].src}
                alt={slides[index].alt}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom caption + counter (matches the blueprint figure language) */}
        <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-paper/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft backdrop-blur-[2px]">
          <span>FIG // FEI LIU</span>
          <span className="text-muted">{slides[index].location}</span>
        </figcaption>

        {/* Right-edge vertical nav rail: prev arrow, dots, next arrow */}
        <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 rounded-full bg-paper/70 px-1.5 py-3 backdrop-blur-[3px]">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={!canPrev}
            aria-label="Previous image"
            className={
              canPrev
                ? "text-ink-soft transition-colors hover:text-accent"
                : "cursor-not-allowed text-ink/25"
            }
          >
            <ArrowUp size={16} weight="bold" />
          </button>
          <div className="flex flex-col items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index || undefined}
                className="p-0.5"
              >
                <span
                  aria-hidden
                  className={
                    i === index
                      ? "block h-1.5 w-1.5 rounded-full bg-accent"
                      : "block h-1.5 w-1.5 rounded-full bg-ink/25 transition-colors hover:bg-ink/50"
                  }
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={!canNext}
            aria-label="Next image"
            className={
              canNext
                ? "text-ink-soft transition-colors hover:text-accent"
                : "cursor-not-allowed text-ink/25"
            }
          >
            <ArrowDown size={16} weight="bold" />
          </button>
        </div>
      </figure>
    </div>
  );
}
