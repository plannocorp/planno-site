import React from 'react';
import './certification-bar.css';

interface CertificationItem {
  icon: string;
  text: string;
}

const certificationItems: CertificationItem[] = [
  { icon: 'fas fa-palette', text: 'Design sob medida' },
  { icon: 'fas fa-globe', text: 'Domínio próprio' },
  { icon: 'fas fa-lock', text: 'SSL e segurança' },
  { icon: 'fab fa-cc-visa', text: 'Mercado Pago na Store' },
  { icon: 'fas fa-headset', text: 'Suporte humano' },
];

export const CertificationBar: React.FC = () => (
  <div className="certification-bar">
    <ul className="certification-list" aria-label="Diferenciais da Planno">
      {[...certificationItems, ...certificationItems, ...certificationItems, ...certificationItems].map((item, i) => (
        <li key={i} className="certification-item" aria-hidden={i >= certificationItems.length}>
          <i className={`${item.icon} certification-icon`} aria-hidden="true"></i>
          <span className="certification-text">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CertificationBar;
