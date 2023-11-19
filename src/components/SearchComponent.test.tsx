// SearchComponent.test.tsx

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import { PokemonProvider } from './PokemonContext';
import SearchComponent from './SearchComponent';
import { act } from 'react-dom/test-utils'; // Добавим импорт act

const queryClient = new QueryClient();

const mockResponse = {
  json: jest.fn().mockResolvedValue({ name: 'pikachu', id: 1 }),
  ok: true,
  status: 200,
  statusText: 'OK',
};

global.fetch = jest.fn().mockResolvedValue(mockResponse);

const renderWithProviders = (children: React.ReactNode) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <PokemonProvider>{children}</PokemonProvider>
      </MemoryRouter>
    </QueryClientProvider>
  </Provider>
);

describe('SearchComponent', () => {
  it('renders the component', () => {
    render(renderWithProviders(<SearchComponent />));
    expect(screen.getByPlaceholderText(/Enter your Pokemon's name/i)).toBeInTheDocument();
  });

  it('handles input change', () => {
    render(renderWithProviders(<SearchComponent />));
    const input = screen.getByPlaceholderText(/Enter your Pokemon's name/i);
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input).toHaveValue('pikachu');
  });

  it('handles search button click', async () => {
    render(renderWithProviders(<SearchComponent />));
    const input = screen.getByPlaceholderText(/Enter your Pokemon's name/i);
    const button = screen.getByText('Add');
  
    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText('Name: pikachu')).toBeInTheDocument();
    });
  });
  
});
