import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ErrorBoundary from './components/ErrorBoundary';
import { useParams } from 'react-router-dom';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const handleSearchError = (error: Error) => {
    console.error('Error in SearchComponent:', error);
  };

  return (
    <Router>
      <ErrorBoundary onError={handleSearchError}>
        <Routes>
          <Route path="/" element={<Navigate to="/search/1" />} />
          <Route path="/search/:page" element={<SearchComponentWrapper />} />
          <Route
            path="/search/:page/:name"
            element={<SearchComponentWithPokemonDetailWrapper />}
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

function SearchComponentWrapper() {
  const { page } = useParams<{ page: string }>();

  return <SearchComponent page={page} />;
}

function SearchComponentWithPokemonDetailWrapper() {
  const { page, name } = useParams<{ page: string; name: string }>();

  return (
    <>
      <SearchComponent page={page} />
      <PokemonDetail name={name} />
    </>
  );
}

export default App;
