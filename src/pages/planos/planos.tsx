import React from 'react';
import './planos.css';
import { Link } from 'react-router-dom';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface Plan {
  name: string;
  summary: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  to?: string;
  href?: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Landing page',
    summary: 'Para captar contatos e vender um serviço ou produto.',
    price: 'Peça seu orçamento',
    unit: 'feita sob medida',
    features: ['Funciona bem no celular', 'Rápida e preparada para buscadores'],
    cta: 'Quero meu orçamento',
    href: whatsappLink(WHATSAPP_MESSAGES.landing),
  },
  {
    name: 'Site institucional',
    summary: 'Para a sua empresa passar confiança e ser encontrada.',
    price: 'Peça seu orçamento',
    unit: 'feito sob medida',
    features: ['Todas as páginas que você precisa', 'Visual da sua marca'],
    cta: 'Quero meu orçamento',
    href: whatsappLink(WHATSAPP_MESSAGES.site),
  },
  {
    name: 'Planno Store',
    summary: 'Para abrir a sua loja e começar a vender.',
    price: 'R$ 129,90',
    unit: 'a partir de, por mês',
    features: ['Painel de pedidos e estoque', 'Pagamento pelo Mercado Pago'],
    cta: 'Ver planos da Store',
    to: '/planos?aba=store',
    featured: true,
  },
  {
    name: 'Hospedagem e manutenção',
    summary: 'Para o seu site ficar sempre no ar.',
    price: 'R$ 65,99',
    unit: 'a partir de, por mês',
    features: ['Hospedagem e SSL', 'Suporte de quem fez o seu site'],
    cta: 'Ver planos',
    to: '/planos?aba=manutencao',
  },
];

export const Planos: React.FC = () => {
  return (
    <section className="section planos" id="planos">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Valores</span>
          <h2>Escolha o plano ideal e comece hoje</h2>
          <p>
            Preço claro para a Planno Store e para a manutenção. Para sites e landing pages, você recebe um orçamento sob medida antes de decidir.
          </p>
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
                <span>{plan.unit}</span>
                <strong className={plan.price.startsWith('R$') ? '' : 'price-text'}>{plan.price}</strong>
              </div>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <i className="fas fa-check" aria-hidden="true"></i> {f}
                  </li>
                ))}
              </ul>
              {plan.to ? (
                <Link to={plan.to} className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}>
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={plan.href}
                  className="btn btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                </a>
              )}
            </article>
          ))}
        </div>

        <p className="planos-note">
          Ficou com dúvida? <a href={whatsappLink(WHATSAPP_MESSAGES.geral)} target="_blank" rel="noopener noreferrer">Fale com a Planno no WhatsApp</a>.
        </p>
      </div>
    </section>
  );
};

export default Planos;
