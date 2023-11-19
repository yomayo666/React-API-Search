import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Pokemon {
  name: string;
  url: string;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<Pokemon[], number>({
      query: (page) => ({ url: `pokemon?limit=5&offset=${(page - 1) * 5}` }),
    }),
    getSinglePokemon: builder.query<Pokemon, string>({
      query: (name) => ({ url: `pokemon/${name}` }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetSinglePokemonQuery } = pokemonApi;
