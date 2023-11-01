import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Импортируем Router
import './App.css';
import SearchComponent from './components/SearchComponent';
import ErrorBoundary from './components/ErrorBoundary';

class App extends React.Component {
  handleSearchError = (error: Error) => {
    console.error('Error in SearchComponent:', error);
  };

  render() {
    return (
      <Router>
        {' '}
        {/* Оборачиваем приложение в Router */}
        <ErrorBoundary onError={this.handleSearchError}>
          <SearchComponent />
        </ErrorBoundary>
      </Router>
    );
  }
}

export default App;
