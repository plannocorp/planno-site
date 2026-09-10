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
  // Quadruplicamos a lista para criar uma esteira longa contínua sem quebras
  const marqueeItems = [
    ...certificationItems,
    ...certificationItems,
    ...certificationItems,
    ...certificationItems,
  ];

  return (
    <div className="certification-bar" aria-label="Garantias e diferenciais da Planno">
      <div className="marquee-track">
        {marqueeItems.map((item, index) => (
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