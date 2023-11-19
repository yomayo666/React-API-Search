import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonProvider } from './PokemonContext';
import PokemonList from './PokemonList';

const mockFetchResult: Partial<Response> = {
  json: jest.fn().mockResolvedValue({
    results: [
      { name: 'pokemon1', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'pokemon2', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  }),
  ok: true,
  status: 200,
  statusText: 'OK',
};

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue(mockFetchResult as Response);
});

test('renders loading state', async () => {
  render(
    <BrowserRouter>
      <PokemonProvider>
        <PokemonList currentPage={1} searchTerm="" />
      </PokemonProvider>
    </BrowserRouter>
  );

  // Добавляем ожидание, чтобы дождаться завершения асинхронной операции (fetch)
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
