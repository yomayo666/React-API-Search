import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SearchComponent from './SearchComponent';
interface Pokemon {
    name: string;
    url: string; // Добавьте свойство url
  }
jest.mock('./PokemonContext', () => ({
  usePokemonContext: jest.fn(() => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    return {
      setPokemons,
      pokemons,
    };
  }),
}));

test('SearchComponent navigates to error page on invalid input', async () => {
  render(
    <MemoryRouter>
      <SearchComponent />
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText("Enter your Pokemon's name");
  const searchButton = screen.getByText('Search');

  userEvent.type(searchInput, 'invalidPokemonName');
  userEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText('Покемон не найден')).toBeInTheDocument();
  });
  
});
