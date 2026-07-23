import { useState } from "react";

// --- Section data is STATIC INPUT. It never changes, so it lives at module scope, not in
// state. "Which section is open" is UI state and lives in the component. Keeping these two
// apart is the whole point of the "don't put isOpen on the section object" constraint. ---
interface Section {
  id: string;
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    id: "s1",
    title: "What is an accordion?",
    body: "A list of sections you expand one at a time.",
  },
  {
    id: "s2",
    title: "Single vs multi open",
    body: "Single closes the others; multi lets many stay open.",
  },
  {
    id: "s3",
    title: "Why derive, don't store",
    body: "Open-state is UI state, kept out of the data array.",
  },
  {
    id: "s4",
    title: "Duplicate titles",
    body: "Two rows can share a title — keys ride on id, never title.",
  },
  {
    id: "s5",
    title: "Lifting state up",
    body: "Parent owns openIds; the item just reports clicks upward.",
  },
];

type Mode = "single" | "multi";

// --- The item is a separate component. It owns NOTHING — it receives `isOpen` and reports
// a click through `onToggle`. All state lives in the parent. This is the lifting-state-up
// drill: the child is a pure function of its props. ---
interface AccordionItemProps {
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, body, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border">
      {/* A real <button>, not a <div onClick>: focusable, Enter/Space work, it IS a control. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex gap-2"
      >
        {/* Indicator is driven by state, not CSS. Flip isOpen and the glyph flips. */}
        <span>{isOpen ? "▾" : "▸"}</span>
        <span>{title}</span>
      </button>
      {/* Conditional render: a closed body is absent from the DOM, not display:none. */}
      {isOpen && <div>{body}</div>}
    </div>
  );
}

export default function Learning() {
  const [mode, setMode] = useState<Mode>("single");

  // ONE representation for both modes: the set of open ids. In single mode we simply keep
  // the set to size <= 1 by construction. Using a Set (not string[]) makes `has` O(1) and
  // makes "toggle" read cleanly. `string | null` would be cheaper for single-open alone,
  // but then the multi switch would need a different type — one shape that serves both is
  // what keeps the mode switch cheap.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.has(id);
      if (isOpen) {
        // Closing is identical in both modes: drop this id.
        const next = new Set(prev);
        next.delete(id);
        return next;
      }
      // Opening: single mode replaces, multi mode adds.
      return mode === "single" ? new Set([id]) : new Set(prev).add(id);
    });
  };

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    // EDGE CASE, decided deliberately: when we collapse multi -> single while several are
    // open, we could keep the first, keep none, or keep the last. We keep the FIRST open
    // one — the mode promises "at most one", so we honour it immediately rather than
    // letting three stay open in a single-open accordion. single -> multi keeps everything.
    if (nextMode === "single") {
      setOpenIds((prev) => {
        const first = prev.values().next().value; // undefined if none were open
        return first === undefined ? new Set() : new Set([first]);
      });
    }
  };

  return (
    <div>
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={mode === "multi"}
          onChange={(e) => changeMode(e.target.checked ? "multi" : "single")}
        />
        Allow multiple open
      </label>

      {/* Empty-list case renders nothing and does not crash. */}
      {SECTIONS.map((section) => (
        <AccordionItem
          // key rides on id, so two sections with the same title stay distinct.
          key={section.id}
          title={section.title}
          body={section.body}
          isOpen={openIds.has(section.id)}
          onToggle={() => toggle(section.id)}
        />
      ))}
    </div>
  );
}
