import Image from "next/image";
import type { XSchoolFounder } from "@/lib/api/xschool";

interface FounderProps {
  founders: XSchoolFounder[];
}

export function Founder({ founders }: FounderProps) {
  return (
    <section className="founder section-shell" aria-labelledby="founder-title">
      <h2 id="founder-title" className="section-title">Founder</h2>
      {founders.length === 0 ? (
        <p className="section-empty">Founder information is currently unavailable.</p>
      ) : (
        founders.map((founder, index) => (
          <div className="founder__row" key={`${founder.name}-${index}`}>
            <div className="founder__portrait">
              <Image src={founder.image} alt={founder.name} fill sizes="(max-width: 767px) 90vw, 38vw" />
              <span className="founder__caption">{founder.name} - {founder.position}</span>
            </div>
            <div className="founder__body">
              <h3>{founder.title}</h3>
              <p>{founder.description}</p>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
