import { useEffect, useState, type ChangeEvent } from "react";
type Pokemon = {
  name: string;
  height: number;
};
interface Result {
  query: string;
  kind: "loading" | "error" | "idle" | "notFound" | "found";
  pokemon: Pokemon | null;
}
export default function Learning() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const query = search.trim();
  const status = !query
    ? "idle"
    : result?.query === query
      ? result.kind
      : "loading";
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`, {
        signal: controller.signal,
      });
      setResult(
        res.ok
          ? { query, kind: "found", pokemon: await res.json() }
          : { query, kind: "notFound", pokemon: null },
      );
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);
  return (
    <div>
      {status === "loading" && <div>loading...</div>}
      {status === "notFound" && <div>not found</div>}
      {status === "error" && <div>something went wrong</div>}
      {status === "found" && result?.pokemon && (
        <div>{result.pokemon.name}</div>
      )}
      <div>
        <input type="text" value={search} onChange={changeSearch} />
      </div>
    </div>
  );
}
