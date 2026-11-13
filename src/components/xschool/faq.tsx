"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  title: string;
  items: FaqItem[];
}

export function Faq({ title, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(items.length ? 0 : null);

  return (
    <section className="faq section-shell" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title faq__title">{title}</h2>
      {items.length === 0 ? (
        <p className="section-empty">No questions are available yet.</p>
      ) : (
        <div className="faq__items">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div className="faq__item" key={`${item.question}-${index}`}>
                <h3>
                  <button
                    className="faq__question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq__symbol" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  className={`faq__answer-panel${isOpen ? " is-open" : ""}`}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div
                    className="faq__answer rich-text"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
