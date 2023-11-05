import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ErrorBoundary from './components/ErrorBoundary';
import { useParams } from 'react-router-dom';

function App() {
  const handleSearchError = (error: Error) => {
    console.error('Error in SearchComponent:', error);
  };

  return (
    <Router>
      <ErrorBoundary onError={handleSearchError}>
        <Routes>
          <Route path="/" element={<SearchComponentWrapper />} />{' '}
          {/* Добавьте маршрут для корневой директории */}
          <Route path="/search/:page" element={<SearchComponentWrapper />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

function SearchComponentWrapper() {
  const { page } = useParams<{ page: string }>();

  return <SearchComponent page={page} />;
}

export default App;
