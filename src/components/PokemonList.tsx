import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

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

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl =
          searchTerm !== ''
            ? `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            : `https://pokeapi.co/api/v2/pokemon?offset=${
                (currentPage - 1) * itemsPerPage
              }&limit=${1300}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if ('results' in data) {
          const pokemons = data.results as Pokemon[];
          setAllPokemons(pokemons);
        } else if ('name' in data) {
          setAllPokemons([data as Pokemon]);
        } else {
          setError('Pokemon not found');
        }
      } catch (err) {
        setError('Pokemon not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(allPokemons.length / itemsPerPage);

  const fetchPokemonInfo = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    navigate(`/search/${currentPage}/${data.name}`);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    navigate(`/search/1${searchTerm ? `/${searchTerm}` : ''}`);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      {searchTerm === '' && (
        <div>
          <label>
            Number of Pokémon per page:{' '}
            <input
              type="number"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              min="1"
              max="50"
            />
          </label>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
          />
          {allPokemons.slice(startIndex, endIndex).map((pokemon, index) => (
            <div key={index} className="">
              <p>Name: {pokemon.name}</p>
              <Link
                to={`/search/${currentPage}/${pokemon.name}`}
                onClick={() => {
                  fetchPokemonInfo(pokemon.name);
                }}
              >
                {pokemon.name}
              </Link>
            </div>
          ))}
        </div>
      )}
      {searchTerm !== '' && (
        <div>
          <p>Имя: {allPokemons[0].name}</p>
          <Link to={`/search/${currentPage}/${allPokemons[0].name}`}>
            {allPokemons[0].name}
          </Link>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
