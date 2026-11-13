import type { XSchoolImage } from "@/lib/api/xschool";
import { AboutCarousel } from "./about-carousel";

interface AboutProps {
  title: string;
  description: string;
  images: XSchoolImage[];
}

export function About({ title, description, images }: AboutProps) {
  const paragraphs = description.split(/\r?\n\s*\r?\n/).filter(Boolean);

  return (
    <section className="about section-shell" aria-labelledby="about-title">
      <div className="about__heading-row">
        <h2 id="about-title" className="section-title about__title">
          {title.split(/\r?\n/).map((line, index) => (
            <span key={`${line}-${index}`}>
              {index === 0 ? line.toUpperCase() : line.charAt(0) + line.slice(1).toUpperCase()}
            </span>
          ))}
        </h2>
        <span className="about__link">Go to xSchool</span>
      </div>
      <div className="about__copy">
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)}
      </div>
      {images.length > 0 ? (
        <AboutCarousel images={images} />
      ) : (
        <p className="section-empty">No gallery images are available.</p>
      )}
    </section>
  );
}
