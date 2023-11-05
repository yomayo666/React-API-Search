import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 10;

interface PokemonListProps {
  currentPage: number;
  searchTerm: string;
}

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC<PokemonListProps> = ({
  currentPage,
  searchTerm,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl =
          searchTerm !== ''
            ? `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            : `https://pokeapi.co/api/v2/pokemon?offset=${
                (currentPage - 1) * ITEMS_PER_PAGE
              }&limit=${1300}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if ('results' in data) {
          const pokemons = data.results as Pokemon[];
          setAllPokemons(pokemons);
        } else if ('name' in data) {
          setAllPokemons([data as Pokemon]);
        } else {
          setError('Покемон не найден');
        }
      } catch (err) {
        setError('Покемон не найден');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const totalPages = Math.ceil(allPokemons.length / ITEMS_PER_PAGE); // Вычислите totalPages

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      {searchTerm === '' && (
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
          />
          {allPokemons.slice(startIndex, endIndex).map((pokemon, index) => (
            <div key={index}>
              <p>Имя: {pokemon.name}</p>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </div>
          ))}
        </div>
      )}

      {searchTerm !== '' && (
        <div>
          <p>Имя: {allPokemons[0].name}</p>
          <Link to={`/pokemon/${allPokemons[0].name}`}>выфвфыв</Link>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
{
  /* <p>URL: - <Link to={`/pokemon/${pokemon.name}`}>{pokemon.url}</Link></p> */
}
