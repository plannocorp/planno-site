import React from 'react';
import './footer.css';
import logoImg from '../../assets/Logo.png';
import { Link, useLocation } from 'react-router-dom';

interface QuickLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  iconClass: string;
}

const quickLinks: QuickLink[] = [
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#solucoes' },
  { label: 'Planno Store', href: '#planno-store' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços', href: '/planos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contato' },
];

const solutions: string[] = [
  'Landing Pages',
  'Sites institucionais',
  'Lojas virtuais (Planno Store)',
  'Hospedagem, SSL e suporte técnico',
];

const socialLinks: SocialLink[] = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5562984458858?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Planno!',
    iconClass: 'fab fa-whatsapp',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/planno.br/',
    iconClass: 'fab fa-instagram',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/plannocorp',
    iconClass: 'fab fa-github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/planno-corp-97b5b63a7/',
    iconClass: 'fab fa-linkedin',
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  // Fora da home, os links de seção precisam apontar para a raiz.
  const anchor = (href: string) => (pathname === '/' ? href : `/${href}`);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Seção da Marca / Logo */}
        <div className="footer-col footer-logo-section">
          <a href={anchor('#home')} className="footer-logo-link" aria-label="Planno, ir ao início">
            <img src={logoImg} alt="Planno" className="footer-logo" width={90} height={60} loading="lazy" />
          </a>
          <p className="footer-description">
            Design com propósito. Tecnologia com estratégia. Sites, landing pages e lojas virtuais para transformar sua presença digital em novas oportunidades de negócio.
          </p>
        </div>

        {/* Links Rápidos */}
        <div className="footer-col">
          <h3 className="footer-title">Links Rápidos</h3>
          <ul className="footer-list">
            {quickLinks.map((item) => (
              <li key={item.href}>
                {item.href.startsWith('/') ? (
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                ) : (
                  <a href={anchor(item.href)} className="footer-link">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Soluções */}
        <div className="footer-col">
          <h3 className="footer-title">Soluções</h3>
          <ul className="footer-list">
            {solutions.map((item) => (
              <li key={item} className="footer-list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Redes Sociais */}
        <div className="footer-col">
          <h3 className="footer-title">Redes Sociais</h3>
          <div className="social-icons">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon-btn"
              >
                <i className={social.iconClass} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa Inferior de Copyright e Políticas */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} Planno. Todos os direitos reservados.
        </p>

        <div className="footer-policies">
          <Link to="/politicas-de-privacidade" className="footer-policy-link">
            Política de Privacidade
          </Link>
          <Link to="/termos-de-uso" className="footer-policy-link">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;