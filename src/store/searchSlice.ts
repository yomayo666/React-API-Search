// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface PokemonInfo {
  name: string;
  weight: number;
  height: number;
  sprites?: Sprites;
}
interface Sprites {
  front_default: string;
}
export interface Pokemon {
  name: string;
  url: string;
}
interface SearchState {
  searchTerm: string;
  searchResults: Pokemon[] | null;
  selectedPokemon: PokemonInfo | null;
  mainPageLoading: boolean; // Флаг загрузки для главной страницы
  detailsPageLoading: boolean; // Флаг загрузки для страницы сведений
}

export const initialState: SearchState = {
  searchTerm: '',
  searchResults: null,
  selectedPokemon: null,
  mainPageLoading: false,
  detailsPageLoading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    saveSearchResults: (state, action: PayloadAction<Pokemon[]>) => {
      state.searchResults = action.payload;
    },
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      const existingPokemon = state.searchResults?.find((pokemon) => pokemon.name === action.payload.name);

      if (!existingPokemon) {
        state.searchResults = state.searchResults ? [...state.searchResults, action.payload] : [action.payload];
      }
    },
    setSelectedPokemon: (state, action: PayloadAction<PokemonInfo | null>) => {
      state.selectedPokemon = action.payload;
    },
    setMainPageLoading: (state, action: PayloadAction<boolean>) => {
      state.mainPageLoading = action.payload;
    },
    setDetailsPageLoading: (state, action: PayloadAction<boolean>) => {
      state.detailsPageLoading = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  saveSearchResults,
  addPokemon,
  setSelectedPokemon,
  setMainPageLoading,
  setDetailsPageLoading,
} = searchSlice.actions;

export const selectSearchTerm = (state: { search: SearchState }) => state.search.searchTerm;
export const selectSearchResults = (state: { search: SearchState }) => state.search.searchResults;
export const selectSelectedPokemon = (state: { search: SearchState }) => state.search.selectedPokemon;
export const selectMainPageLoading = (state: { search?: SearchState }) => state.search?.mainPageLoading;
export const selectDetailsPageLoading = (state: { search: SearchState }) => state.search.detailsPageLoading;

export default searchSlice.reducer;
