import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { usePokemonList } from '../hooks/usePokemonList';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const { pokemons, loading, error } = usePokemonList();

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [pokemons, search]);

  return (
    <Layout>
      <section className="hero">
        <div>
          <p className="eyebrow">Aplicação React + API externa</p>
          <h1>Explore uma Pokédex com rotas dinâmicas</h1>
          <p>
            Este projeto consome a PokeAPI e exibe informações detalhadas dos pokémons
            em páginas internas com links dinâmicos.
          </p>
        </div>
      </section>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <section className="grid-list">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <p className="status-message">Nenhum pokémon encontrado.</p>
          )}
        </section>
      )}
    </Layout>
  );
}
