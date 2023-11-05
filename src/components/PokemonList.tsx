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

  // Читаем значение itemsPerPage из localStorage при монтировании компонента
  const initialItemsPerPage = parseInt(localStorage.getItem('itemsPerPage') || '5', 10);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

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
          setError('Покемон не найден');
        }
      } catch (err) {
        setError('Покемон не найден');
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

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);

    // Сохраняем новое значение в localStorage
    localStorage.setItem('itemsPerPage', newItemsPerPage.toString());

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
            <select
              value={itemsPerPage}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                handleItemsPerPageChange(event);
              }}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
          />
          {allPokemons.slice(startIndex, endIndex).map((pokemon, index) => (
            <div key={index} className="">
              <Link
                to={`/search/${currentPage}/${pokemon.name}`}
                onClick={() => {
                  fetchPokemonInfo(pokemon.name);
                }}
              >
                <p>Имя: {pokemon.name}</p>
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
