import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { formatId, formatName, getPokemonImage } from '../utils/format';

export default function PokemonCard({ pokemon }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.name);

  return (
    <article className="pokemon-card">
      <button
        className={`favorite-button ${favorite ? 'active' : ''}`}
        onClick={() => toggleFavorite(pokemon.name)}
        aria-label="Favoritar pokémon"
        type="button"
      >
        {favorite ? '★' : '☆'}
      </button>

      <img src={getPokemonImage(pokemon)} alt={pokemon.name} className="pokemon-image" />
      <span className="pokemon-id">{formatId(pokemon.id)}</span>
      <h2>{formatName(pokemon.name)}</h2>

      <div className="types">
        {pokemon.types.map(({ type }) => (
          <span key={type.name} className="type-badge">
            {formatName(type.name)}
          </span>
        ))}
      </div>

      <Link to={`/pokemon/${pokemon.name}`} className="details-link">
        Ver detalhes
      </Link>
    </article>
  );
}
