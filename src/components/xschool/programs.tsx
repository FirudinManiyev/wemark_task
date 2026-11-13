import type { XSchoolProgram } from "@/lib/api/xschool";
import { cleanRichText } from "@/lib/rich-text";

interface ProgramsProps {
  programs: XSchoolProgram[];
}

export function Programs({ programs }: ProgramsProps) {
  return (
    <section className="programs section-shell" aria-labelledby="programs-title">
      <h2 id="programs-title" className="section-title">
        {programs[0]?.title ?? "Programs"}
      </h2>
      {programs.length === 0 ? (
        <p className="section-empty">Program information is currently unavailable.</p>
      ) : (
        programs.map((program, index) => (
          <div
            className="programs__content rich-text"
            key={`${program.title}-${index}`}
            dangerouslySetInnerHTML={{ __html: cleanRichText(program.description) }}
          />
        ))
      )}
    </section>
  );
}
