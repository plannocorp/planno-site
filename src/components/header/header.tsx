import React, { useState, useEffect } from 'react';
import './header.css';
import logoImg from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface NavItem {
  label: string;
  /** Âncora de uma seção da home (#id) ou rota própria (/rota). */
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Serviços', href: '#solucoes' },
  { label: 'Planno Store', href: '#planno-store' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços', href: '#planos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contato' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('#home');

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (href: string) => {
    setActiveItem(href);
    setIsMenuOpen(false);
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

  // ScrollSpy Inteligente: auto-ordena pelas posições reais no DOM
  useEffect(() => {
    const sectionIds = ['home', 'apresentacao', 'solucoes', 'planno-store', 'problemas-e-solucoes', 'diferenciais', 'como-funciona', 'planos', 'contato'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Ponto focal abaixo do header

      // Topo absoluto da página
      if (window.scrollY < 120) {
        setActiveItem('#home');
        return;
      }


      // Obtém as seções existentes e ordena pela posição real na página
      const existingSections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .sort(
          (a, b) =>
            a.getBoundingClientRect().top + window.scrollY -
            (b.getBoundingClientRect().top + window.scrollY)
        );

      let currentActive = existingSections[0]?.id || 'home';

      // Percorre na ordem real do documento
      for (const section of existingSections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) {
          currentActive = section.id;
        }
      }

      setActiveItem(`#${currentActive}`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        {/* Marca / Logo */}
        <a href="#home" className="header-brand" onClick={() => closeMenu('#home')} aria-label="Planno, ir ao início">
          <img src={logoImg} alt="Planno" className="header-logo" width={90} height={60} />
        </a>

        {/* Navegação Desktop */}
        <nav className="header-nav" aria-label="Navegação Principal">
          <ul className="header-nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href.startsWith('/') ? (
                  <Link to={item.href} className="header-nav-link">
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`header-nav-link ${activeItem === item.href ? 'active' : ''}`}
                    aria-current={activeItem === item.href ? 'true' : undefined}
                    onClick={() => setActiveItem(item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a
                href={whatsappLink(WHATSAPP_MESSAGES.site)}
                target="_blank"
                rel="noopener noreferrer"
                className="header-cta"
              >
                Quero meu novo site
              </a>
            </li>
          </ul>
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <button
          type="button"
          className={`header-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
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

      <div id="mobile-menu" className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.href.startsWith('/') ? (
                <Link to={item.href} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={`mobile-nav-link ${activeItem === item.href ? 'active' : ''}`}
                  aria-current={activeItem === item.href ? 'true' : undefined}
                  onClick={() => closeMenu(item.href)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          <li className="mobile-cta-wrapper">
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.site)}
              target="_blank"
              rel="noopener noreferrer"
              className="header-cta mobile-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Quero meu novo site
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;