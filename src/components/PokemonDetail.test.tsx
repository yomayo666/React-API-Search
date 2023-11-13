import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonProvider } from './PokemonContext'; 
import PokemonDetail from './PokemonDetail';

jest.mock('node-fetch');

describe('PokemonDetail Component', () => {
  it('renders loading state and fetches data', async () => {

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/search/1/bulbasaur']}>
          <PokemonProvider>
            <Routes>
              <Route
                path="/search/:page/:name"
                element={<PokemonDetailWrapper />}
              />
            </Routes>
          </PokemonProvider>
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Pokemon Information/i)).toBeInTheDocument();



    await waitFor(() => {
    });
  });

  it('handles errors and navigates to not-found', async () => {

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/search/1/nonexistentpokemon']}>
          <PokemonProvider>
            <Routes>
              <Route
                path="/search/:page/:name"
                element={<PokemonDetailWrapper />}
              />
            </Routes>
          </PokemonProvider>
        </MemoryRouter>
      );
    });

  });

  it('closes the detail view and navigates back', async () => {

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/search/1/bulbasaur']}>
          <PokemonProvider>
            <Routes>
              <Route
                path="/search/:page/:name"
                element={<PokemonDetailWrapper />}
              />
            </Routes>
          </PokemonProvider>
        </MemoryRouter>
      );
    });

  });
});

function PokemonDetailWrapper() {
  return <PokemonDetail
    currentPage={1}
    onClose={() => {
    }}
  />;
}
