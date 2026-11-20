import React from 'react';
import './planos.css';
import { Link } from 'react-router-dom';

interface Plan {
  name: string;
  summary: string;
  price: string;
  description: string;
  to: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Sites e Landing Pages',
    summary: 'Presença digital profissional',
    price: 'R$ 65,90',
    description: 'Hospedagem, SSL e suporte técnico conforme o plano contratado.',
    to: '/planos?aba=manutencao',
  },
  {
    name: 'Planno Store',
    summary: 'Sua estrutura de vendas online',
    price: 'R$ 129,90',
    description: 'Loja virtual com gestão de produtos e integração de pagamentos.',
    to: '/planos?aba=store',
    featured: true,
  },
];

export const Planos: React.FC = () => {
  return (
    <section className="section planos" id="planos" aria-labelledby="planos-titulo">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <h2 id="planos-titulo">O próximo passo do seu negócio cabe no seu planejamento.</h2>
        </div>

        <div className="planos-grid">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`plan-card ${plan.featured ? 'plan-featured' : ''}`}
              data-reveal="fade-up"
              data-delay={i * 80}
            >
              <h3>{plan.name}</h3>
              <p className="plan-summary">{plan.summary}</p>
              <div className="plan-price">
                <span>A partir de</span>
                <strong>
                  {plan.price}
                  <small>/mês</small>
                </strong>
              </div>
              <p className="plan-description">{plan.description}</p>
              <Link
                to={plan.to}
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}
                aria-label={`Ver planos: ${plan.name}`}
              >
                Ver planos
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planos;
