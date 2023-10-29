import SearchComponent from './components/SearchComponent';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import React, { Component } from 'react';
class App extends Component {
  handleSearchError = (error: Error) => {
    console.error('Error in SearchComponent:', error);
  }
  render() {
    return (
      <ErrorBoundary onError={this.handleSearchError}>
        <SearchComponent></SearchComponent>
      </ErrorBoundary>
    );
  }
}

export default App;
