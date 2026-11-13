"use client";

interface ScrollToTopProps {
  variant: "desktop" | "mobile";
}

export function ScrollToTop({ variant }: ScrollToTopProps) {
  function scrollToTop() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <button
      className={variant === "desktop" ? "site-footer__up" : "site-footer__back"}
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      {variant === "desktop" ? "↑" : "BACK TO TOP ↑"}
    </button>
  );
}
