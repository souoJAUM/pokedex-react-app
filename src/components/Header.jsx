import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="brand">
          Pokédex React
        </Link>

        <nav className="nav">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noreferrer"
          >
            API
          </a>
        </nav>
      </div>
    </header>
  );
}
