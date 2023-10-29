import React, { Component, ChangeEvent } from 'react';

interface Ability {
  name: string;
  url: string;
}

interface Form {
  name: string;
  url: string;
  id: number;
}

interface Sprites {
  front_shiny: string;
}

interface Pokemon {
  name: string;
  url: string;
  abilities?: Ability[];
  forms?: Form[];
  sprites?: Sprites;
}

interface SearchComponentState {
  searchTerm: string;
  searchResults: Pokemon | null;
  loading: boolean;
  allPokemons: Pokemon[];
  error: string | null;
}

class SearchComponent extends Component<object, SearchComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      searchResults: null,
      loading: false,
      allPokemons: [],
      error: null,
    };
  }

  componentDidMount() {
    if (!this.state.searchTerm) {
      this.callApi('https://pokeapi.co/api/v2/pokemon/');
    } else {
      this.search();
    }
  }

  search = () => {
    const { searchTerm } = this.state;
    const processedSearchTerm = searchTerm.trim();

    this.setState({ loading: true, error: null }); // Сбрасываем ошибку перед выполнением поиска

    if (processedSearchTerm === '') {
      this.callApi('https://pokeapi.co/api/v2/pokemon/');
    } else {
      this.callApi(`https://pokeapi.co/api/v2/pokemon/${processedSearchTerm}`);
    }
  }

  callApi = (apiUrl: string) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: Pokemon | { results: Pokemon[] }) => {
        if ('results' in data) {
          this.setState({
            allPokemons: data.results,
            searchResults: null,
            loading: false,
          });
        } else if (data.name) {
          this.setState({
            searchResults: data as Pokemon,
            loading: false,
          });
          localStorage.setItem('searchTerm', this.state.searchTerm);
        } else {
          this.setState({
            searchResults: null,
            loading: false,
            error: 'Pokemon not found',
          });
        }
      })
      .catch(() => {
        this.setState({
          searchResults: null,
          loading: false,
          error: 'An error occurred',
        });
      });
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  }

  handleThrowError = () => {
    throw new Error('This is a bug for testing ErrorBoundary.');
  }

  render() {
    const { searchTerm, searchResults, loading, allPokemons, error } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter your Pokemon's name"
            value={searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.search}>Search</button>
          <button onClick={this.handleThrowError}>Raise an error</button>
        </div>

        {loading && <p>Loading...</p>}
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            {searchResults ? (
              <div>
                <p>Name: {searchResults.name}</p>
                {searchResults.forms && (
                  <ul>
                    {searchResults.forms.map((form, index) => (
                      <li key={index}>
                        <p>URL: - <a href={form.url}>{form.url}</a></p>
                        {searchResults.sprites && searchResults.sprites.front_shiny && (
                          <img src={searchResults.sprites.front_shiny} alt={searchResults.name} />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              allPokemons.map((pokemon, index) => (
                <div key={index}>
                  <p>Name: {pokemon.name}</p>
                  <p>URL: - <a href={pokemon.url}>{pokemon.url}</a></p>
                  {pokemon.sprites && (
                    <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchComponent;
