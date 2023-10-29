import SearchComponent from './components/SearchComponent'
import './App.css';
import ErrorBoundary from './components/ErrorBoundary'
import React, { Component } from 'react';
class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <SearchComponent>
        </SearchComponent>
      </ErrorBoundary>
    );
  }
}

export default App;
