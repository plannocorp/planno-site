import React from 'react';
import { Link } from 'react-router-dom';
import './oferecimento.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface Solution {
  icon: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  href: string;
  external?: boolean;
  featured?: boolean;
}

const solutions: Solution[] = [
  {
    icon: 'fas fa-rectangle-ad',
    name: 'Landing page',
    tagline: 'Para campanhas, lançamentos e serviços: uma página criada para convencer e gerar contatos.',
    price: 'Peça seu orçamento',
    priceNote: 'feita sob medida para você',
    features: ['Visual profissional em qualquer celular', 'Carregamento rápido e pronta para o Google', 'Chamada clara para o cliente falar com você'],
    cta: 'Quero minha landing page',
    href: whatsappLink(WHATSAPP_MESSAGES.landing),
    external: true,
  },
  {
    icon: 'fas fa-building',
    name: 'Site institucional',
    tagline: 'Apresente a sua empresa com o profissionalismo que os seus clientes esperam encontrar.',
    price: 'Peça seu orçamento',
    priceNote: 'feito sob medida para você',
    features: ['Design exclusivo com a cara da sua marca', 'Todas as páginas que o seu negócio precisa', 'Rápido, seguro e pronto para o Google'],
    cta: 'Quero meu site',
    href: whatsappLink(WHATSAPP_MESSAGES.site),
    external: true,
  },
  {
    icon: 'fas fa-bag-shopping',
    name: 'Planno Store',
    tagline: 'Venda o dia todo com uma loja completa: produtos, estoque, pedidos e pagamento em um só lugar.',
    price: 'R$ 129,90',
    priceNote: 'a partir de, por mês',
    features: ['Receba pelo Mercado Pago', 'Controle de estoque e pedidos', 'Montamos a loja para você'],
    cta: 'Quero vender online',
    href: '#planno-store',
    featured: true,
  },
];

export const Oferecimento: React.FC = () => {
  return (
    <section className="section oferecimento" id="solucoes">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Soluções</span>
          <h2>Tudo o que o seu negócio precisa para vender online</h2>
          <p>
            Do primeiro clique do cliente até o pagamento, a Planno cuida da estrutura para você vender mais.
          </p>
        </div>

        <div className="solutions-grid">
          {solutions.map((s, i) => (
            <article
              key={s.name}
              className={`solution-card ${s.featured ? 'solution-featured' : ''}`}
              data-reveal="fade-up"
              data-delay={i * 100}
            >
              {s.featured && <span className="solution-flag">Mais procurado</span>}
              <i className={`${s.icon} solution-icon`} aria-hidden="true"></i>
              <h3>{s.name}</h3>
              <p className="solution-tagline">{s.tagline}</p>

              <div className="solution-price">
                <span>{s.priceNote}</span>
                <strong className={s.price.startsWith('R$') ? '' : 'price-text'}>{s.price}</strong>
              </div>

              <ul className="solution-features">
                {s.features.map((f) => (
                  <li key={f}>
                    <i className="fas fa-check" aria-hidden="true"></i> {f}
                  </li>
                ))}
              </ul>

              <a
                className={`btn ${s.featured ? 'btn-primary' : 'btn-ghost'}`}
                href={s.href}
                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {s.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="maintenance-strip" data-reveal="fade-up">
          <div>
            <h3>Seu site sempre no ar, seguro e atualizado</h3>
            <p>
              Hospedagem, SSL, backups e suporte de quem conhece o seu projeto. A partir de R$ 65,99/mês.
            </p>
          </div>
          <Link to="/planos?aba=manutencao" className="btn btn-ghost">
            Ver planos de manutenção
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Oferecimento;
