import React from 'react';
import './oferecimento.css';

export const Oferecimento: React.FC = () => {
  return (
    <section className="oferecimento" id="solucoes">
      <div className="oferecimento-container">
        {/* Cabeçalho da Seção */}
        <div className="oferecimento-header" data-reveal="fade-up">
          <div className="oferecimento-badge">
            <i className="fas fa-circle" aria-hidden="true"></i> O QUE OFERECEMOS
          </div>
          <h2 className="oferecimento-title">Soluções digitais completas</h2>
        </div>

        {/* Grid com os 2 Cards de Solução */}
        <div className="oferecimento-grid">
          {/* Card 1: Planno Store (Destaque) */}
          <div className="solution-card solution-card-highlight" data-reveal="fade-up" data-delay="0">
            <div className="card-top-row">
              <div className="card-title-group">
                <i className="fas fa-bag-shopping card-main-icon" aria-hidden="true"></i>
                <h3 className="card-title">Planno Store</h3>
              </div>
              <span className="card-pill">MAIS PROCURADO</span>
            </div>

            <p className="card-description">
              Lojas virtuais estruturadas, seguras e personalizadas. O produto ideal para você
              vender seus produtos online com gerenciamento simples de estoque, fluxo de pedidos e
              pagamentos via Mercado Pago.
            </p>

            <ul className="card-checklist">
              <li>
                <i className="fas fa-check" aria-hidden="true"></i> Painel administrativo completo
              </li>
              <li>
                <i className="fas fa-check" aria-hidden="true"></i> Controle de estoque e catálogo
              </li>
              <li>
                <i className="fas fa-check" aria-hidden="true"></i> Checkout integrado (cartão/Pix)
              </li>
            </ul>

            <a href="#planos" className="card-cta-link">
              Conhecer a plataforma <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

          {/* Card 2: Sites & Landing Pages */}
          <div className="solution-card" data-reveal="fade-up" data-delay="150">
            <div className="card-top-row">
              <div className="card-title-group">
                <i className="fas fa-laptop-code card-main-icon" aria-hidden="true"></i>
                <h3 className="card-title">Sites & Landing Pages</h3>
              </div>
            </div>

            <p className="card-description">
              Criação de páginas focadas em captação de leads, lançamento de produtos, blogs de
              conteúdo ou sites institucionais sob medida para sua marca ter autoridade digital imediata.
            </p>

            <ul className="card-checklist">
              <li>
                <i className="fas fa-check" aria-hidden="true"></i> Design otimizado para celulares
              </li>
              <li>
                <i className="fas fa-check" aria-hidden="true"></i> Otimização de velocidade e SEO
              </li>
              <li>
                <i className="fas fa-check" aria-hidden="true"></i> Manutenção técnica e suporte ativo
              </li>
            </ul>

            <a href="#planos" className="card-cta-link">
              Ver planos de hospedagem <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Oferecimento;