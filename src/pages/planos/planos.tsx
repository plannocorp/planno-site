import React from 'react';
import './planos.css';
import { Link } from 'react-router-dom';

interface Plan {
  label: string;
  title: string;
  features: string[];
  price: string;
  buttonText: string;
  link: string;
}

const plans: Plan[] = [
  {
    label: 'Presença Institucional',
    title: 'Sites, Blogs & LPs',
    features: [
      'Landing pages de alta performance',
      'Hospedagem e SSL ativo inclusos',
      'Suporte técnico especializado',
    ],
    price: '65,99',
    buttonText: 'Ver detalhes e planos',
    link: '/planos',
  },
  {
    label: 'Planno Store (Ecommerce)',
    title: 'Lojas virtuais completas',
    features: [
      'Planos Start, Pro e Premium',
      'Domínio .com.br incluso',
      'Integração Mercado Pago e frete inclusa',
    ],
    price: '99,90',
    buttonText: 'Comparar lojas',
    link: '/planos',
  },
];

export const Planos: React.FC = () => {
  return (
    <section className="planos" id="planos">
      <div className="planos-container">
        {/* Cabeçalho */}
        <div className="planos-header">
          <span className="section-badge">
            <i className="fas fa-circle" aria-hidden="true"></i> Planos
          </span>
          <h2 className="planos-title">Escolha a solução ideal para o seu momento</h2>
          <p className="planos-subtitle">
            Compare os planos para presença institucional ou venda online. Todos os planos contam
            com manutenção técnica da Planno.
          </p>
        </div>

        {/* Grid com os 2 cards de planos */}
        <div className="planos-grid">
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <div className="plan-header">
                <span className="plan-pill">{plan.label}</span>
                <h3 className="plan-name">{plan.title}</h3>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <i className="fas fa-circle-check" aria-hidden="true"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="plan-pricing">
                <span className="price-prefix">A partir de </span>
                <strong className="price-value">R$ {plan.price}</strong>
                <span className="price-suffix"> / mês</span>
              </div>

              <Link to={plan.link} className="plan-cta-btn">
                {plan.buttonText} <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planos;