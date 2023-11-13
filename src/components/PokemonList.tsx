import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import PokemonListProps from './PokemonListProps';
import ItemsPerPage from './ItemsPerPageProps';
import { usePokemonContext } from './PokemonContext'; 

interface PokemonListProps {
  currentPage: number;
  searchTerm: string;
}
export interface Pokemon {
  name: string;
  url: string;
}
const PokemonList: React.FC<PokemonListProps> = ({ currentPage, searchTerm }) => {
  const { pokemons, setPokemons } = usePokemonContext(); 

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialItemsPerPage = parseInt(localStorage.getItem('itemsPerPage') || '5', 10);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl =
          searchTerm !== ''
            ? `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            : `https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * itemsPerPage}&limit=${2000}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if ('results' in data) {
          const pokemons = data.results as Pokemon[];
          setPokemons(pokemons);
        } else if ('name' in data) {
          setPokemons([data as Pokemon]);
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
  }, [currentPage, searchTerm, itemsPerPage, setPokemons]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  const fetchPokemonInfo = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    navigate(`/search/${currentPage}/${data.name}`);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);

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
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
          />
          <PokemonListProps
            pokemons={pokemons.slice(startIndex, endIndex)}
            currentPage={currentPage}
            fetchPokemonInfo={fetchPokemonInfo}
          />
        </div>
      )}
      {searchTerm !== '' && (
        <div className="one-pokemon">
          <p>Name: {pokemons[0].name}</p>
          <Link to={`/search/${currentPage}/${pokemons[0].name}`}>
            {pokemons[0].name}
          </Link>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
