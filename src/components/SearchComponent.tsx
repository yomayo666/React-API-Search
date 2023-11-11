import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonList from './PokemonList';
import { usePokemonContext } from './PokemonContext';

const SearchComponent = ({ page }: { page?: string }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  // Using the Pokemon context
  const { setPokemons } = usePokemonContext();

  useEffect(() => {
    if (page && isNaN(parseInt(page, 10))) {
      navigate('/error-page');
    }
  }, [page, navigate]);

  const currentPage = page ? parseInt(page, 10) : 1;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSearch = async () => {
    try {
      const newPokemons = await fetchPokemons(searchTerm);
      setPokemons(newPokemons);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  const fetchPokemons = async (term: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
    const data = await response.json();


    if ('results' in data) {
      return data.results;
    } else {
      throw new Error('Invalid API response');
    }
  };

  return (
    <div className="main-block">
      <div>
        <input
          type="text"
          placeholder="Enter your Pokemon's name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <PokemonList currentPage={currentPage} searchTerm={searchTerm} />
    </div>
  );
};

export default SearchComponent;
