import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from './PokemonContext'; // Замените на правильный путь

interface PokemonSprites {
  front_default: string;
}
interface Pokemon {
  name: string;
  url: string;
}
interface PokemonInfo {
  name: string;
  weight: number;
  height: number;
  sprites: PokemonSprites;
}

interface PokemonDetailProps {
  name?: string;
  currentPage: number;
  onClose: () => void;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ name, currentPage, onClose }) => {
  const { pokemons, setPokemons } = usePokemonContext();
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const cachedPokemon = pokemons.find((pokemon) => pokemon.name === name);
        if (cachedPokemon) {
          setPokemonInfo({
            name: cachedPokemon.name,
            weight: 0,
            height: 0,
            sprites: { front_default: '' },
          });
          setLoading(false);
        } else if (name) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          if (response.ok) {
            const data: PokemonInfo = await response.json();
            setPokemonInfo(data);
            setPokemons((prevPokemons: Pokemon[]) => [...prevPokemons, { name, url: '' }]);
          } else {
            console.error('Ошибка при загрузке информации о покемоне');
            throw new Error('Pokemon not found');
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке информации о покемоне', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonInfo();
  }, [name, navigate, setPokemons, pokemons]);

  const handleClose = () => {
    onClose();
    navigate(`/search/${currentPage}/`);
  };

  return (
    <div className="pokemon-info">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button className="close-but" onClick={handleClose}>
            Закрыть
          </button>
          <h2>Pokemon Information {name}</h2>
          <p>Name: {pokemonInfo?.name}</p>
          <p>Weight: {pokemonInfo?.weight}</p>
          <p>Height: {pokemonInfo?.height}</p>
          <img src={pokemonInfo?.sprites?.front_default} alt={pokemonInfo?.name} />
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
