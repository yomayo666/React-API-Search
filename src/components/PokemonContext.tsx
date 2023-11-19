import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextProps {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export default PokemonProvider;
