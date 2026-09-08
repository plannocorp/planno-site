import React, { useEffect, useState } from 'react';
import './home.css';

type TabType = 'vendas' | 'pedidos' | 'pagamentos';

export const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('vendas');

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="home" id="home">
      <div className={`home-container ${loaded ? 'show-up' : 'hidden-up'}`}>
        {/* Lado Esquerdo: Textos e Chamadas Principais */}
        <div className="hero-copy">
          <div className="hero-badges">
            <span className="hero-badge">
              <i className="fas fa-circle" aria-hidden="true"></i> Planno Store
            </span>
            <span className="hero-badge">
              <i className="fas fa-bolt" aria-hidden="true"></i> Implantação e Configuração Chave na Mão
            </span>
          </div>

          <h1 className="main-title">
            Sua presença digital completa, da ideia à loja pronta.
          </h1>

          <p className="main-desc">
            Criação e implantação completa da sua loja online personalizada pela nossa equipe,
            ou desenvolvimento sob demanda de sites institucionais, blogs e landing pages de
            alta conversão. Nós cuidamos do design e da parte técnica para você focar em vender.
          </p>

          <div className="hero-actions">
            <a
              className="primary-action btn-whatsapp-hover"
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/5562984458858?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20um%20especialista%20sobre%20a%20cria%C3%A7%C3%A3o%20da%20minha%20loja%20ou%20site%20personalizado."
            >
              Falar no WhatsApp <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
            <a className="secondary-action" href="#solucoes">
              Conhecer Soluções
            </a>
          </div>

          <p className="setup-note">
            <i className="fas fa-check" aria-hidden="true"></i> Consultoria humana.{' '}
            <span>Nós cuidamos da infraestrutura.</span>
          </p>
        </div>

        {/* Lado Direito: Card / Painel Interativo Planno Store */}
        <div className="hero-panel">
          <div className="panel-badge-row">
            <span className="panel-eyebrow">
              <span className="pulse-dot"></span> Destaque: Planno Store
            </span>
            <span className="panel-tag">Chave na Mão</span>
          </div>

          <h2>Sua loja virtual pronta para vender, configurada por quem entende.</h2>
          <p className="panel-description">
            Não entregamos apenas uma plataforma fria. Nós cuidamos do design personalizado,
            integramos o Mercado Pago e configuramos seu domínio para você receber sua loja pronta.
          </p>

          {/* Mini Dashboard Interativo */}
          <div className="interactive-dashboard">
            {/* Barra superior do mockup (estilo OS/Browser) */}
            <div className="dash-window-header">
              <div className="dash-window-dots">
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

            {/* Navegação de Abas do Mockup */}
            <div className="dash-tabs" role="tablist">
              <button
                type="button"
                className={`dash-tab ${activeTab === 'vendas' ? 'active' : ''}`}
                onClick={() => setActiveTab('vendas')}
              >
                <i className="fas fa-chart-line" aria-hidden="true"></i> Vendas
              </button>
              <button
                type="button"
                className={`dash-tab ${activeTab === 'pedidos' ? 'active' : ''}`}
                onClick={() => setActiveTab('pedidos')}
              >
                <i className="fas fa-box" aria-hidden="true"></i> Pedidos
              </button>
              <button
                type="button"
                className={`dash-tab ${activeTab === 'pagamentos' ? 'active' : ''}`}
                onClick={() => setActiveTab('pagamentos')}
              >
                <i className="fab fa-cc-visa" aria-hidden="true"></i> Mercado Pago
              </button>
            </div>

            {/* Conteúdo Dinâmico por Aba */}
            <div className="dash-body">
              {activeTab === 'vendas' && (
                <div className="dash-view fade-in">
                  <div className="metric-header">
                    <div>
                      <span className="metric-label">Faturamento do Dia</span>
                      <strong className="metric-value">R$ 4.890,00</strong>
                    </div>
                    <span className="metric-growth">
                      <i className="fas fa-arrow-trend-up" aria-hidden="true"></i> +28.4%
                    </span>
                  </div>

                  {/* Gráfico SVG de curva suave */}
                  <div className="chart-container">
                    <svg viewBox="0 0 300 80" className="revenue-chart">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6579ff" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#6579ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,65 C40,60 70,35 110,40 C150,45 190,15 230,22 C265,28 285,10 300,5 L300,80 L0,80 Z"
                        fill="url(#chartGradient)"
                      />
                      <path
                        d="M0,65 C40,60 70,35 110,40 C150,45 190,15 230,22 C265,28 285,10 300,5"
                        fill="none"
                        stroke="#6579ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="300" cy="5" r="4" fill="#FAFAFA" stroke="#6579ff" strokeWidth="2" />
                    </svg>
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
                        <strong>Pedido #1042</strong>
                        <span>Lucas Ramos • 2 itens</span>
                      </div>
                      <span className="order-badge badge-green">Pix • Aprovado</span>
                    </div>

                    <div className="order-item">
                      <div className="order-avatar">
                        <i className="fas fa-bag-shopping" aria-hidden="true"></i>
                      </div>
                      <div className="order-details">
                        <strong>Pedido #1041</strong>
                        <span>Mariana Costa • 1 item</span>
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
                        <span>Checkout Transparente Ativo</span>
                      </div>
                      <span className="status-live">100% Seguro</span>
                    </div>
                    <div className="payment-badges">
                      <span><i className="fas fa-bolt" aria-hidden="true"></i> Pix Automático</span>
                      <span><i className="fas fa-credit-card" aria-hidden="true"></i> Cartão até 12x</span>
                      <span><i className="fas fa-barcode" aria-hidden="true"></i> Boleto</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé com chips de integração */}
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
        </div>
      </div>
    </section>
  );
};

export default Home;