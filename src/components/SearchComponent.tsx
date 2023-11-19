// SearchComponent.tsx
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonList from './PokemonList';
import { useDispatch, useSelector } from 'react-redux';
import { setMainPageLoading } from '../store/searchSlice';
import {
  setSearchTerm,
  saveSearchResults,
  addPokemon,
  selectMainPageLoading,
} from '../store/searchSlice';

export interface Pokemon {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
}
const SearchComponent = ({ page }: { page?: string }) => {
  const [searchTerm, setSearchTermLocal] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainPageLoading = useSelector(selectMainPageLoading); // Используем флаг загрузки из хранилища

  useEffect(() => {
    if (page && isNaN(parseInt(page, 10))) {
      navigate('/error-page');
    }
  }, [page, navigate]);

  const currentPage = page ? parseInt(page, 10) : 1;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value.trim());
  };

  const handleSearch = async () => {
    try {
      dispatch(setMainPageLoading(true)); // Устанавливаем флаг загрузки в true перед запросом
      const newPokemon = await fetchPokemon(searchTerm);
      
      dispatch(addPokemon(newPokemon));
      dispatch(setSearchTerm(searchTerm));
      dispatch(saveSearchResults([newPokemon]));
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      dispatch(setMainPageLoading(false)); // Устанавливаем флаг загрузки в false после запроса
    }
  };

  const fetchPokemon = async (term: string): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
    const data = await response.json();

    const newPokemon: Pokemon = { name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}/` };

    return newPokemon;
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.trim() !== '') {
      handleSearch();
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
        <button onClick={handleSearchButtonClick} disabled={mainPageLoading}>
          {mainPageLoading ? 'Loading...' : 'Add'}
        </button>
      </div>
      <PokemonList currentPage={currentPage} searchTerm={searchTerm} />
    </div>
  );
};

export default SearchComponent;
