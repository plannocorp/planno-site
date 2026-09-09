import React, { useState, useEffect } from 'react';
import './header-alt.css';
import logoImg from '../../../assets/Logo.png';
import { Link } from 'react-router-dom';

export const HeaderAlt: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const whatsappUrl =
    'https://wa.me/5562984458858?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os%20da%20Planno.';

  return (
    <header className="header-alt">
      <div className="header-alt-container">
        {/* Marca / Logo */}
        <Link to="/" className="header-alt-brand" onClick={() => setIsMenuOpen(false)}>
          <img src={logoImg} alt="Planno Logo" className="header-alt-logo" />
        </Link>

        {/* Navegação Desktop */}
        <nav className="header-alt-nav" aria-label="Navegação da Página">
          <ul className="header-alt-nav-list">
            <li>
              <Link to="/" className="header-alt-nav-link">
                <i className="fas fa-arrow-left" aria-hidden="true"></i> Voltar ao Início
              </Link>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="header-alt-cta"
              >
                Falar no WhatsApp <i className="fab fa-whatsapp" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <button
          type="button"
          className={`header-alt-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
      </div>

      {/* Backdrop e Drawer Mobile */}
      <div
        className={`mobile-backdrop ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          <li>
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-arrow-left" aria-hidden="true"></i> Voltar ao Início
            </Link>
          </li>
          <li className="mobile-cta-wrapper">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="header-alt-cta mobile-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Falar no WhatsApp <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderAlt;