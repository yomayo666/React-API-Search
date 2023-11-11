import React from 'react';
import NotFound from './components/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ErrorBoundary from './components/ErrorBoundary';
import PokemonDetail from './components/PokemonDetail';
import { useParams } from 'react-router-dom';

// Импортируем ваш контекст
import { PokemonProvider } from './components/PokemonContext';

function App() {
  const handleSearchError = (error: Error) => {
    console.error('Error in SearchComponent:', error);
  };

  return (
    <Router>
      <ErrorBoundary onError={handleSearchError}>
        {/* Оборачиваем приложение в PokemonProvider */}
        <PokemonProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/search/1" />} />
            <Route path="/search/:page" element={<SearchComponentWrapper />} />
            <Route
              path="/search/:page/:name"
              element={<SearchComponentWithPokemonDetailWrapper />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PokemonProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

function SearchComponentWrapper() {
  const { page } = useParams<{ page: string }>();

  return <SearchComponent page={page} />;
}

function SearchComponentWithPokemonDetailWrapper() {
  const { page, name } = useParams<{
    page: string | undefined;
    name: string;
  }>();

  const currentPage = page ? parseInt(page, 10) : 1;

  return (
    <>
      <SearchComponent page={page || '1'} />
      {name && (
        <PokemonDetail
          name={name}
          currentPage={currentPage}
          onClose={() => {
            // Обработка закрытия
          }}
        />
      )}
    </>
  );
}
