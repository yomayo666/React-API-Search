import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from './PokemonList';
interface PokemonListProps {
  pokemons: Pokemon[];
  currentPage: number;
  fetchPokemonInfo: (name: string) => void;
}

const PokemonListDisplay: React.FC<PokemonListProps> = ({
  pokemons,
  currentPage,
  fetchPokemonInfo,
}) => {
  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <div key={index} className="all-pokemons">
          <Link
            to={`/search/${currentPage}/${pokemon.name}`}
            onClick={() => {
              fetchPokemonInfo(pokemon.name);
            }}
          >
            <p>Name: {pokemon.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonListDisplay;
