import { useEffect, useState, type ChangeEvent } from "react";

interface Pokemon {
  name: string;
  height: number;
}

interface Result {
  query: string;
  kind: "found" | "notFound" | "error";
  pokemon: Pokemon | null;
}

export default function AsyncSearch() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const query = search.trim().toLowerCase();

  // Derived, not state: we're idle with no query, and loading whenever the
  // result we're holding doesn't belong to the query currently in the box.
  const status = !query
    ? "idle"
    : result?.query === query
      ? result.kind
      : "loading";

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query}`,
          { signal: controller.signal },
        );

        setResult(
          response.ok
            ? { query, kind: "found", pokemon: (await response.json()) as Pokemon }
            : { query, kind: "notFound", pokemon: null },
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setResult({ query, kind: "error", pokemon: null });
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <div>
        <input
          value={search}
          onChange={changeSearch}
          placeholder="Search pokemon"
        />
      </div>

      {status === "loading" && <div>loading...</div>}
      {status === "notFound" && <div>not found</div>}
      {status === "error" && <div>something went wrong</div>}
      {status === "found" && result?.pokemon && (
        <div>
          <h1>{result.pokemon.name}</h1>
          <p>height: {result.pokemon.height}</p>
        </div>
      )}
    </div>
  );
}
