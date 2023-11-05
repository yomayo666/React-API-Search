import React, { useState, ChangeEvent } from 'react';
import PokemonList from './PokemonList';

const SearchComponent = ({ page }: { page?: string }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const currentPage = page ? parseInt(page, 10) : 1;


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Введите имя вашего покемона"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <PokemonList currentPage={currentPage} searchTerm={searchTerm} />
    </div>
  );
};
export default SearchComponent;
