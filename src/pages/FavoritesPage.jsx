import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import PokemonCard from '../components/PokemonCard';
import { useFavorites } from '../context/FavoritesContext';
import { getPokemonByName } from '../api/pokeApi';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      if (favorites.length === 0) {
        setPokemons([]);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const data = await Promise.all(favorites.map((name) => getPokemonByName(name)));

        if (isMounted) {
          setPokemons(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar favoritos.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [favorites]);

  return (
    <Layout>
      <section className="hero small">
        <div>
          <p className="eyebrow">Página interna</p>
          <h1>Seus favoritos</h1>
          <p>Pokémons marcados localmente no navegador.</p>
        </div>
      </section>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <section className="grid-list">
          {pokemons.length > 0 ? (
            pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
          ) : (
            <p className="status-message">Você ainda não adicionou favoritos.</p>
          )}
        </section>
      )}
    </Layout>
  );
}
