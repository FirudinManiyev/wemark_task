"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { XSchoolImage } from "@/lib/api/xschool";

interface AboutCarouselProps {
  images: XSchoolImage[];
}

export function AboutCarousel({ images }: AboutCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);

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
    rail.scrollBy({ left: event.key === "ArrowRight" ? step : -step, behavior: "smooth" });
  }

  return (
    <div
      ref={railRef}
      className="about-carousel"
      role="region"
      aria-label="xSchool image gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {images.map(({ image }, index) => (
        <div className="about-carousel__slide" key={`${image}-${index}`}>
          <Image src={image} alt={`xSchool gallery image ${index + 1}`} fill sizes="(max-width: 767px) 44vw, 60vw" />
        </div>
      ))}
    </div>
  );
}
