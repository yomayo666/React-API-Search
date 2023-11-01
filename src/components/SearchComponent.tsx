import React, { useState, ChangeEvent } from 'react';

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

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    const processedSearchTerm = searchTerm.trim();
    setLoading(true);
    setError(null);

    if (processedSearchTerm === '') {
      callApi('https://pokeapi.co/api/v2/pokemon/');
    } else {
      callApi(`https://pokeapi.co/api/v2/pokemon/${processedSearchTerm}`);
    }
  };

  const callApi = (apiUrl: string) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: Pokemon | { results: Pokemon[] }) => {
        if ('results' in data) {
          setAllPokemons(data.results);
          setSearchResults(null);
          setLoading(false);
        } else if (data.name) {
          setSearchResults(data as Pokemon);
          setLoading(false);
        } else {
          setSearchResults(null);
          setLoading(false);
          setError('Pokemon not found');
        }
      })
      .catch(() => {
        setSearchResults(null);
        setLoading(false);
        setError('An error occurred');
      });
  };

  const handleThrowError = () => {
    throw new Error('This is a bug for testing ErrorBoundary.');
  };

  return (
    <div>
      {/* Верхняя секция (поиск) */}
      <div>
        <input
          type="text"
          placeholder="Enter your Pokemon's name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={search}>Search</button>
        <button onClick={handleThrowError}>Raise an error</button>
      </div>

      {/* Нижняя секция (результаты поиска) */}
      <div>
        {loading && <p>Loading...</p>}
        {error ? <p>{error}</p> : null}
        {searchResults ? (
          <div>
            <p>Name: {searchResults.name}</p>
            {searchResults.forms && (
              <ul>
                {searchResults.forms.map((form, index) => (
                  <li key={index}>
                    <p>
                      URL: - <a href={form.url}>{form.url}</a>
                    </p>
                    {searchResults.sprites &&
                      searchResults.sprites.front_shiny && (
                        <img
                          src={searchResults.sprites.front_shiny}
                          alt={searchResults.name}
                        />
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
              <p>
                URL: - <a href={pokemon.url}>{pokemon.url}</a>
              </p>
              {pokemon.sprites && (
                <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
