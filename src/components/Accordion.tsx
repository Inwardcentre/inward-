"use client";

import { useState, useRef, KeyboardEvent } from "react";

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export function AccordionItem({ id, question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion();
    }
  };

  return (
    <div className="border-b border-muted-border/60 last:border-0 py-4">
      <h3>
        <button
          id={`accordion-trigger-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${id}`}
          onClick={toggleAccordion}
          onKeyDown={handleKeyDown}
          className="flex justify-between items-center w-full text-left py-3 font-sans font-bold text-base md:text-lg text-primary-forest transition-colors hover:text-ochre-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent rounded-md px-2"
          type="button"
        >
          <span>{question}</span>
          <svg
            className={`w-5 h-5 text-ochre-accent flex-shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="px-2 pb-4 pt-1 font-sans text-sm md:text-base leading-relaxed text-muted-text max-w-[680px]">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: AccordionItemProps[];
}

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="bg-light-card border border-muted-border/80 rounded-2xl p-4 md:p-6 shadow-sm">
      {items.map((item) => (
        <AccordionItem key={item.id} {...item} />
      ))}
    </div>
  );
}
