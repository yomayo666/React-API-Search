// Ваши импорты
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedPokemon } from '../store/searchSlice';
interface PokemonInfo {
  name: string;
  weight: number;
  height: number;
  sprites?: Sprites;
}

interface Sprites {
  front_default: string;
}

const PokemonDetail = ({
  name,
  currentPage,
  onClose,
}: {
  name?: string;
  currentPage: number;
  onClose: () => void;
}) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (response.ok) {
          const data = await response.json();
          setPokemonInfo(data);
          dispatch(setSelectedPokemon(data));
        } else {
          console.error('Ошибка при загрузке информации о покемоне');
        }
      } catch (error) {
        console.error('Ошибка при загрузке информации о покемоне', error);
      }
    };

    if (name) {
      fetchPokemonInfo();
    }
  }, [name, dispatch]);

  const handleClose = () => {
    onClose();
    navigate(`/search/${currentPage}/`);
  };

  return (
    <div className="pokemon-info">
      {pokemonInfo ? (
        <div>
          <button className="close-but" onClick={handleClose}>
            Закрыть
          </button>
          <h2>Pokemon Information {name}</h2>
          <p>Name: {pokemonInfo.name}</p>
          <p>Weight: {pokemonInfo.weight}</p>
          <p>Height: {pokemonInfo.height}</p>
          <img
            src={pokemonInfo.sprites?.front_default}
            alt={pokemonInfo.name}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetail;
