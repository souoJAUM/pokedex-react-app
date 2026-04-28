import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getPokemonByName, getPokemonSpecies } from '../api/pokeApi';
import { formatId, formatName, getFlavorText, getPokemonImage } from '../utils/format';
import { useFavorites } from '../context/FavoritesContext';

export default function PokemonDetailsPage() {
  const { name } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadDetails() {
      try {
        setLoading(true);
        setError('');

        const [pokemonData, speciesData] = await Promise.all([
          getPokemonByName(name),
          getPokemonSpecies(name),
        ]);

        if (isMounted) {
          setPokemon(pokemonData);
          setSpecies(speciesData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar detalhes do pokémon.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [name]);

  return (
    <Layout>
      <Link to="/" className="back-link">
        ← Voltar para a listagem
      </Link>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && pokemon && species && (
        <section className="details-card">
          <div className="details-header">
            <div>
              <p className="eyebrow">Detalhes dinâmicos</p>
              <h1>{formatName(pokemon.name)}</h1>
              <p className="pokemon-id">{formatId(pokemon.id)}</p>
            </div>

            <button
              className={`favorite-button details-favorite ${
                isFavorite(pokemon.name) ? 'active' : ''
              }`}
              onClick={() => toggleFavorite(pokemon.name)}
              type="button"
            >
              {isFavorite(pokemon.name) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </button>
          </div>

          <div className="details-grid">
            <img src={getPokemonImage(pokemon)} alt={pokemon.name} className="details-image" />

            <div className="details-info">
              <p>
                <strong>Descrição:</strong> {getFlavorText(species.flavor_text_entries)}
              </p>
              <p>
                <strong>Altura:</strong> {pokemon.height / 10} m
              </p>
              <p>
                <strong>Peso:</strong> {pokemon.weight / 10} kg
              </p>
              <p>
                <strong>Experiência base:</strong> {pokemon.base_experience}
              </p>
              <p>
                <strong>Tipos:</strong>{' '}
                {pokemon.types.map(({ type }) => formatName(type.name)).join(', ')}
              </p>
              <p>
                <strong>Habilidades:</strong>{' '}
                {pokemon.abilities
                  .map(({ ability }) => formatName(ability.name.replace('-', ' ')))
                  .join(', ')}
              </p>
            </div>
          </div>

          <div className="stats-box">
            <h2>Status base</h2>
            {pokemon.stats.map(({ stat, base_stat }) => (
              <div key={stat.name} className="stat-row">
                <span>{formatName(stat.name.replace('-', ' '))}</span>
                <div className="stat-bar">
                  <div style={{ width: `${Math.min(base_stat, 100)}%` }} />
                </div>
                <strong>{base_stat}</strong>
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
