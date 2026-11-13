"use client";

import { useEffect, useState } from "react";

const navigation = ["About", "Services", "Case Studies", "Career", "Blog", "xSchool"];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled} aria-label="Site header">
      <button className="site-header__logo" type="button" aria-label="Wemark">wemark</button>
      <nav className="site-header__navigation" aria-label="Main navigation">
        {navigation.map((item) => <button type="button" key={item}>{item}</button>)}
      </nav>
      <button className="site-header__talk" type="button">Let’s Talk</button>
      <button className="site-header__menu" type="button">Menu</button>
    </header>
  );
}
