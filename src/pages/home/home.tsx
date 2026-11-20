import React, { useEffect, useState } from 'react';
import './home.css';
import './hero-panel.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

type TabType = 'vendas' | 'pedidos' | 'pagamentos';

export const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('vendas');

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="home" id="home">
      <div className={`home-container ${loaded ? 'is-loaded' : ''}`}>
        <div className="hero-copy">
          <h1 className="main-title">
            Seu negócio merece mais do que estar online. Merece se destacar.
          </h1>

          <p className="main-desc">
            Criamos sites modernos, estratégicos e personalizados para transformar sua presença digital em novas oportunidades de negócio.
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink(WHATSAPP_MESSAGES.site)}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i> Quero meu novo site
            </a>
            <a className="btn btn-ghost" href="#solucoes">
              Conhecer soluções
            </a>
          </div>

          <p className="hero-tagline">
            <strong>Design com propósito. Tecnologia com estratégia.</strong>
            <span>Resultados que começam com uma boa experiência.</span>
          </p>
        </div>

        <div className="hero-panel">
          <div className="panel-badge-row">
            <span className="panel-eyebrow">
              <span className="pulse-dot"></span> Destaque: Planno Store
            </span>
            <span className="panel-tag">Chave na Mão</span>
          </div>

          <div className="interactive-dashboard">
            <div className="dash-window-header">
              <div className="dash-window-dots" aria-hidden="true">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="dash-window-url">
                <i className="fas fa-lock" aria-hidden="true"></i>
                <span>sualoja.com.br/admin</span>
              </div>
              <span className="dash-status-pill">
                <span className="status-indicator"></span> Ativa
              </span>
            </div>

            <div className="dash-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'vendas'}
                className={`dash-tab ${activeTab === 'vendas' ? 'active' : ''}`}
                onClick={() => setActiveTab('vendas')}
              >
                <i className="fas fa-chart-line" aria-hidden="true"></i> Vendas
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'pedidos'}
                className={`dash-tab ${activeTab === 'pedidos' ? 'active' : ''}`}
                onClick={() => setActiveTab('pedidos')}
              >
                <i className="fas fa-box" aria-hidden="true"></i> Pedidos
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'pagamentos'}
                className={`dash-tab ${activeTab === 'pagamentos' ? 'active' : ''}`}
                onClick={() => setActiveTab('pagamentos')}
              >
                <i className="fab fa-cc-visa" aria-hidden="true"></i> Mercado Pago
              </button>
            </div>

            <div className="dash-body">
              {activeTab === 'vendas' && (
                <div className="dash-view fade-in">
                  <div className="metric-header">
                    <div>
                      <span className="metric-label">Faturamento de exemplo</span>
                      <strong className="metric-value">R$ 4.890,00</strong>
                    </div>
                    <span className="metric-growth">
                      <i className="fas fa-arrow-trend-up" aria-hidden="true"></i> +28,4%
                    </span>
                  </div>

                  <div className="chart-container">
                    <svg viewBox="0 0 310 90" className="revenue-chart" aria-hidden="true">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4558d8" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#4558d8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <g transform="translate(5 8)">
                        <path
                          d="M0,65 C40,60 70,35 110,40 C150,45 190,15 230,22 C265,28 285,10 300,5 L300,76 L0,76 Z"
                          fill="url(#chartGradient)"
                        />
                        <path
                          d="M0,65 C40,60 70,35 110,40 C150,45 190,15 230,22 C265,28 285,10 300,5"
                          fill="none"
                          stroke="#4558d8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle className="chart-halo" cx="300" cy="5" r="4" fill="#4558d8" />
                        <circle cx="300" cy="5" r="4" fill="#fff" stroke="#4558d8" strokeWidth="2.5" />
                      </g>
                    </svg>
                    <div className="chart-axis">
                      <span>Início do período</span>
                      <span>Hoje</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pedidos' && (
                <div className="dash-view fade-in">
                  <div className="orders-list">
                    <div className="order-item">
                      <div className="order-avatar">
                        <i className="fas fa-bag-shopping" aria-hidden="true"></i>
                      </div>
                      <div className="order-details">
                        <strong>Pedido de exemplo A</strong>
                        <span>Cliente de exemplo • 2 itens</span>
                      </div>
                      <span className="order-badge badge-green">Pago</span>
                    </div>

                    <div className="order-item">
                      <div className="order-avatar">
                        <i className="fas fa-bag-shopping" aria-hidden="true"></i>
                      </div>
                      <div className="order-details">
                        <strong>Pedido de exemplo B</strong>
                        <span>Cliente de exemplo • 1 item</span>
                      </div>
                      <span className="order-badge badge-blue">Enviado</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pagamentos' && (
                <div className="dash-view fade-in">
                  <div className="payment-integration-box">
                    <div className="payment-row">
                      <div className="payment-brand">
                        <i className="fas fa-shield-halved" aria-hidden="true"></i>
                        <span>Pix e cartão</span>
                      </div>
                      <span className="status-live">Mercado Pago</span>
                    </div>
                    <div className="payment-badges">
                      <span><i className="fas fa-plug" aria-hidden="true"></i> Mercado Pago conectado</span>
                      <span><i className="fas fa-credit-card" aria-hidden="true"></i> Pix e cartão</span>
                      <span><i className="fas fa-rotate" aria-hidden="true"></i> Status automático</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="dash-footer">
              <div className="feature-chip">
                <i className="fas fa-check" aria-hidden="true"></i> Domínio Incluso
              </div>
              <div className="feature-chip">
                <i className="fas fa-check" aria-hidden="true"></i> Mercado Pago
              </div>
              <div className="feature-chip">
                <i className="fas fa-check" aria-hidden="true"></i> Painel Simples
              </div>
            </div>
          </div>
          <p className="panel-note">Ilustração com dados de exemplo.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
