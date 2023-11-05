import React, { useEffect, useState } from 'react';

interface PokemonInfo {
    name: string;
    weight: number;
    height: number;
}
const PokemonDetail = ({ name }: { name?: string }) => {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (response.ok) {
          const data = await response.json();
          setPokemonInfo(data);
        } else {
          console.error('Ошибка при загрузке информации о покемоне');
        }
      } catch (error) {
        console.error('Ошибка при загрузке информации о покемоне', error);
      }
    };

    fetchPokemonInfo();
  }, [name]);

  return (
    <div className="pokemon-info">
      {pokemonInfo ? (
        <div>
          <h2>Pokemon Information {name}</h2>
          <p>Name: {pokemonInfo.name}</p>
          <p>Weight: {pokemonInfo.weight}</p>
          <p>Height: {pokemonInfo.height}</p>
          {/* Здесь вы можете добавить другую информацию о покемоне */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetail;
