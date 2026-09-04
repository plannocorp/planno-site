import React, { useEffect, useState } from 'react';
import './home.css';

export const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dispara a animação show-up suavemente após a montagem do componente
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

        {/* Lado Direito: Painel Destaque (Card Mockup) */}
        <div className="hero-panel">
          <span className="panel-eyebrow">Destaque: Planno Store</span>
          <h2>Sua loja virtual pronta para vender, configurada por quem entende.</h2>
          <p>
            Não entregamos apenas uma plataforma fria. Nós cuidamos do design personalizado,
            integramos o Mercado Pago, configuramos seu domínio e você recebe a loja online
            configurada e pronta para vender.
          </p>

          <div className="mockup-screen">
            <div className="mockup-card">
              <i className="fas fa-chart-line mockup-icon" aria-hidden="true"></i>
              <span className="mockup-title">Painel Administrativo Planno Store</span>
              <span className="mockup-subtitle">Configurado e pronto para vender</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;