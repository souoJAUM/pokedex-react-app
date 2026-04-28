import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PokemonDetailsPage from '../pages/PokemonDetailsPage';
import FavoritesPage from '../pages/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
