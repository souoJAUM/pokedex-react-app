export function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function getPokemonImage(pokemon) {
  return (
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default
  );
}

export function getFlavorText(entries) {
  const entry = entries.find((item) => item.language.name === 'en');
  return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : 'Descrição indisponível.';
}
