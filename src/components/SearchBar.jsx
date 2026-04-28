export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Pesquise por nome do Pokémon..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
