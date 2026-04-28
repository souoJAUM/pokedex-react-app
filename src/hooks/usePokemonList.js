import { useEffect, useState } from 'react';
import { getPokemonByName, getPokemonList } from '../api/pokeApi';

export function usePokemonList(limit = 24, offset = 0) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPokemons() {
      try {
        setLoading(true);
        setError('');

        const listData = await getPokemonList(limit, offset);
        const details = await Promise.all(
          listData.results.map((pokemon) => getPokemonByName(pokemon.name)),
        );

        if (isMounted) {
          setPokemons(details);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao buscar pokémons.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      isMounted = false;
    };
  }, [limit, offset]);

  return { pokemons, loading, error };
}
