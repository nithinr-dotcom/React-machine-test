import { useState, type ChangeEvent } from "react";

interface Items {
  id: string;
  title: string;
  body: string;
}
const LIST_ITEMS: Items[] = [
  {
    id: crypto.randomUUID(),
    title: "Title one",
    body: "Title one description",
  },
  {
    id: crypto.randomUUID(),
    title: "Title two",
    body: "Title two description",
  },
  {
    id: crypto.randomUUID(),
    title: "Title three",
    body: "Title three description",
  },
  {
    id: crypto.randomUUID(),
    title: "Title four",
    body: "Title four description",
  },
];

type MODE = "single" | "multiple";
type AccordionProps = {
  title: string;
  body: string;
  isOpen: boolean;
  toggleHandler: () => void;
  id: string;
};
const Accordion = ({ title, body, isOpen, toggleHandler }: AccordionProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5" onClick={toggleHandler}>
        <div>{title}</div>{" "}
        {isOpen ? <div>arrow down</div> : <div>arrow up</div>}
      </div>
      {isOpen && <div>{body}</div>}
    </div>
  );
};
export default function Learning() {
  const [mode, setMode] = useState<MODE>("single");
  const [activeIds, setActiveIds] = useState(new Set());
  //mode change handler
  const changeMode = (mode: MODE) => {
    setMode(mode);
    if (mode === "single") {
      setActiveIds((prev) => {
        const first = prev.values().next().value;
        return first === undefined ? new Set() : new Set([first]);
      });
    }
  };
  const toggleHandler = (id: string) => {
    setActiveIds((prev) => {
      const isOpen = activeIds.has(id);
      if (isOpen) {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }
      return mode === "single" ? new Set([id]) : new Set(prev).add(id);
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={mode === "multiple"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeMode(e.target.checked ? "multiple" : "single")
            }
          />
          Allow multiple
        </label>
      </div>
      <div>
        {LIST_ITEMS.map((v) => (
          <Accordion
            title={v.title}
            body={v.body}
            key={v.id}
            toggleHandler={() => toggleHandler(v.id)}
            isOpen={activeIds.has(v.id)}
            id={v.id}
          />
        ))}
      </div>
    </div>
  );
}
