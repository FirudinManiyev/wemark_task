"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { XSchoolImage } from "@/lib/api/xschool";

interface AboutCarouselProps {
  images: XSchoolImage[];
}

export function AboutCarousel({ images }: AboutCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    const secondImage = rail?.children.item(1) as HTMLElement | null;
    if (rail && secondImage) {
      const centeringOffset = window.innerWidth >= 768
        ? (rail.clientWidth - secondImage.clientWidth) / 2
        : 0;
      rail.scrollLeft = secondImage.offsetLeft - centeringOffset;
    }
  }, [images]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const rail = railRef.current;
    if (!rail) return;
    const step = (rail.children.item(0) as HTMLElement | null)?.clientWidth ?? rail.clientWidth;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: event.key === "ArrowRight" ? step : -step, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const rail = railRef.current;
    if (!drag || !rail || drag.pointerId !== event.pointerId) return;
    rail.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
  }

  function endDrag() {
    dragRef.current = null;
    setIsDragging(false);
  }

  return (
    <div
      ref={railRef}
      className={`about-carousel${isDragging ? " is-dragging" : ""}`}
      role="region"
      aria-label="xSchool image gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
    >
      {images.map(({ image }, index) => (
        <div className="about-carousel__slide" key={`${image}-${index}`}>
          <Image src={image} alt={`xSchool gallery image ${index + 1}`} fill sizes="(max-width: 767px) 44vw, 60vw" draggable={false} />
        </div>
      ))}
    </div>
  );
}
