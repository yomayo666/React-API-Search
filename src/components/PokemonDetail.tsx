import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Sprites {
  front_default: string;
}

interface PokemonInfo {
  name: string;
  weight: number;
  height: number;
  sprites: Sprites;
}

interface PokemonDetailProps {
  name?: string;
  currentPage: number;
  onClose: () => void;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ name, currentPage, onClose }) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
          const data = await response.json();
          setPokemonInfo(data);
        } else {
          console.error('Ошибка при загрузке информации о покемоне');
          throw new Error('Pokemon not found');
        }
      } catch (error) {
        console.error('Ошибка при загрузке информации о покемоне', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonInfo();
  }, [name, navigate]);

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
