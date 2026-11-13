"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { XSchoolImage } from "@/lib/api/xschool";

interface AboutCarouselProps {
  images: XSchoolImage[];
}

interface DragPosition {
  pointerId: number;
  startX: number;
  scrollLeft: number;
}

const AUTO_SCROLL_SPEED = 30;
const INTERACTION_DELAY = 1_500;

export function AboutCarousel({ images }: AboutCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const cycleWidthRef = useRef(0);
  const dragRef = useRef<DragPosition | null>(null);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || images.length < 2) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let previousTime = 0;

    function wrapPosition() {
      if (!rail) return;
      const width = cycleWidthRef.current;
      if (!width) return;

      let shift = 0;
      if (rail.scrollLeft >= width * 2) shift = -width;
      else if (rail.scrollLeft < width) shift = width;

      if (shift) {
        rail.scrollLeft += shift;
        if (dragRef.current) dragRef.current.scrollLeft += shift;
      }
    }

    function measureCycle() {
      if (!rail) return;
      const first = rail.children.item(0) as HTMLElement | null;
      const next = rail.children.item(images.length) as HTMLElement | null;
      if (!first || !next) return;

      const width = next.offsetLeft - first.offsetLeft;
      if (width <= 0) return;

      const previousWidth = cycleWidthRef.current;
      const relativePosition = previousWidth
        ? (rail.scrollLeft - previousWidth) / previousWidth
        : null;
      cycleWidthRef.current = width;

      if (relativePosition !== null) {
        rail.scrollLeft = width * (1 + relativePosition);
      } else {
        const second = rail.children.item(1) as HTMLElement | null;
        const slideOffset = second ? second.offsetLeft - first.offsetLeft : 0;
        const centeringOffset = window.innerWidth >= 768 && second
          ? (rail.clientWidth - second.clientWidth) / 2
          : 0;
        rail.scrollLeft = width + slideOffset - centeringOffset;
      }
      wrapPosition();
    }

    function tick(time: number) {
      frame = 0;
      if (!rail || !visible || motionPreference.matches || document.hidden) return;

      if (previousTime && time >= pauseUntilRef.current && !dragRef.current) {
        rail.scrollLeft += AUTO_SCROLL_SPEED * Math.min(time - previousTime, 50) / 1_000;
        wrapPosition();
      }
      previousTime = time;
      frame = window.requestAnimationFrame(tick);
    }

    function syncPlayback() {
      const shouldPlay = visible && !motionPreference.matches && !document.hidden;
      if (shouldPlay && !frame) {
        previousTime = 0;
        frame = window.requestAnimationFrame(tick);
      } else if (!shouldPlay && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    measureCycle();
    const resizeObserver = new ResizeObserver(measureCycle);
    resizeObserver.observe(rail);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    intersectionObserver.observe(rail);
    rail.addEventListener("scroll", wrapPosition, { passive: true });
    motionPreference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      rail.removeEventListener("scroll", wrapPosition);
      motionPreference.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [images.length]);

  function pausePlayback() {
    pauseUntilRef.current = performance.now() + INTERACTION_DELAY;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const rail = railRef.current;
    if (!rail) return;

    pausePlayback();
    const first = rail.children.item(0) as HTMLElement | null;
    const second = rail.children.item(1) as HTMLElement | null;
    const step = first && second ? second.offsetLeft - first.offsetLeft : rail.clientWidth;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: event.key === "ArrowRight" ? step : -step,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    pauseUntilRef.current = Number.POSITIVE_INFINITY;
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    rail.classList.add("is-dragging");
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const rail = railRef.current;
    if (!drag || !rail || drag.pointerId !== event.pointerId) return;
    rail.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
  }

  function endInteraction(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      railRef.current?.classList.remove("is-dragging");
    }
    pausePlayback();
  }

  const copies = images.length > 1 ? [0, 1, 2] : [1];

  return (
    <div
      ref={railRef}
      className="about-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="xSchool image gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endInteraction}
      onPointerCancel={endInteraction}
      onLostPointerCapture={endInteraction}
      onWheel={pausePlayback}
    >
      {copies.flatMap((copy) => images.map(({ image }, index) => {
        const isClone = copy !== 1;
        return (
          <div
            className="about-carousel__slide"
            key={`${copy}-${image}-${index}`}
            aria-hidden={isClone}
          >
            <Image
              src={image}
              alt={isClone ? "" : `xSchool gallery image ${index + 1}`}
              fill
              sizes="(max-width: 767px) 44vw, 60vw"
              draggable={false}
            />
          </div>
        );
      }))}
    </div>
  );
}
