const BASE_URL = 'https://pokeapi.co/api/v2';

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados da API.');
  }

  return response.json();
}

export async function getPokemonList(limit = 24, offset = 0) {
  return request(`/pokemon?limit=${limit}&offset=${offset}`);
}

export async function getPokemonByName(name) {
  return request(`/pokemon/${name.toLowerCase()}`);
}

export async function getPokemonSpecies(name) {
  return request(`/pokemon-species/${name.toLowerCase()}`);
}
