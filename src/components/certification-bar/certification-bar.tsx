import React from 'react';
import './certification-bar.css';

interface CertificationItem {
  icon: string;
  text: string;
}

const certificationItems: CertificationItem[] = [
  { icon: 'fab fa-cc-visa', text: 'Mercado Pago Integrado' },
  { icon: 'fas fa-palette', text: 'Design Customizado' },
  { icon: 'fas fa-globe', text: 'Domínio Próprio' },
  { icon: 'fas fa-lock', text: 'SSL e Segurança Ativa' },
  { icon: 'fas fa-headset', text: 'Suporte Humano Próximo' },
];

export const CertificationBar: React.FC = () => {
  return (
    <div className="certification-bar">
      <div className="certification-container">
        {certificationItems.map((item, index) => (
          <div key={index} className="certification-item">
            <i className={`${item.icon} certification-icon`} aria-hidden="true"></i>
            <span className="certification-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationBar;