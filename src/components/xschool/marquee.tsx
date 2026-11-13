import type { XSchoolTextSlider } from "@/lib/api/xschool";

interface MarqueeProps {
  lines: XSchoolTextSlider;
}

export function Marquee({ lines }: MarqueeProps) {
  const items = Object.values(lines).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <section className="marquee" aria-label={items.join(", ")}>
      {[0, 1].map((row) => (
        <div className="marquee__row" key={row} aria-hidden="true">
          <div className={`marquee__track ${row === 1 ? "marquee__track--reverse" : ""}`}>
            {[...items, ...items, ...items, ...items].map((item, index) => (
              <span className="marquee__item" key={`${row}-${index}`}>
                {item}<span className="marquee__star">*</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
