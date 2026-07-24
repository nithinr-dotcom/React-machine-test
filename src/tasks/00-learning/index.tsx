import { useEffect, useState, type ChangeEvent } from "react";

interface Pokemon {
  name: string;
}
export default function Learning() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon>({ name: "" });
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const getPokemon = async () => {
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${search}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const data = (await response).json();
    console.log({ data });
  };
  useEffect(() => {
    getPokemon();
  }, [search, getPokemon]);
  return (
    <div>
      <div>
        <input value={search} onChange={changeSearch} />
      </div>
    </div>
  );
}
