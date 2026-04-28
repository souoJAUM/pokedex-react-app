import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="hero small">
        <div>
          <p className="eyebrow">404</p>
          <h1>Página não encontrada</h1>
          <p>O conteúdo que você tentou acessar não existe.</p>
          <Link to="/" className="details-link inline-link">
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    </Layout>
  );
}
