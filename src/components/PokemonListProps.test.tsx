import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonListDisplay from './PokemonListProps';

const mockPokemons = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  // Другие покемоны...
];

test('renders PokemonListDisplay component', () => {
  render(
    <MemoryRouter>
      <PokemonListDisplay
        pokemons={mockPokemons}
        currentPage={1}
        fetchPokemonInfo={jest.fn()}
      />
    </MemoryRouter>
  );

  expect(screen.getByText('Name: pikachu')).toBeInTheDocument();
});

test('calls fetchPokemonInfo when a link is clicked', () => {
  const fetchPokemonInfoMock = jest.fn();

  render(
    <MemoryRouter>
      <PokemonListDisplay
        pokemons={mockPokemons}
        currentPage={1}
        fetchPokemonInfo={fetchPokemonInfoMock}
      />
    </MemoryRouter>
  );

  // Кликаем на ссылку
  fireEvent.click(screen.getByText('Name: pikachu'));

  // Проверяем, что функция fetchPokemonInfo вызвана с правильными аргументами
  expect(fetchPokemonInfoMock).toHaveBeenCalledWith('pikachu');
});
