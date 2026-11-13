import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";

interface HeroProps {
  title: string;
  image: string;
}

export function Hero({ title, image }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {image && (
        <Image
          className="hero__image"
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
        />
      )}
      <div className="hero__shade" />
      <SiteHeader />
      <h1 id="hero-title" className="hero__title">
        {title.split(/\r?\n/).map((line, index) => (
          <span key={`${line}-${index}`}>{line}</span>
        ))}
      </h1>
    </section>
  );
}
