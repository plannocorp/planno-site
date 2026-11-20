import React from 'react';
import './oferecimento.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface Service {
  icon: string;
  name: string;
  tagline: string;
  description: string;
}

const services: Service[] = [
  {
    icon: 'fas fa-rectangle-ad',
    name: 'Landing Pages',
    tagline: 'Uma página. Um objetivo. Uma experiência pensada para converter.',
    description:
      'Páginas estratégicas para campanhas, lançamentos, captação de leads e apresentação de ofertas, com foco em conduzir o visitante à ação.',
  },
  {
    icon: 'fas fa-building',
    name: 'Sites institucionais',
    tagline: 'A primeira impressão da sua empresa merece ser memorável.',
    description:
      'Sites profissionais e responsivos que apresentam seus serviços, fortalecem sua credibilidade e facilitam o contato com seus clientes.',
  },
  {
    icon: 'fas fa-bag-shopping',
    name: 'Lojas virtuais',
    tagline: 'Seu negócio aberto para novas oportunidades, todos os dias.',
    description:
      'Experiências de compra intuitivas, com organização de produtos, navegação simplificada e uma estrutura pensada para facilitar suas vendas online.',
  },
];

export const Oferecimento: React.FC = () => {
  return (
    <section className="section oferecimento" id="solucoes" aria-labelledby="solucoes-titulo">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Nossos serviços</span>
          <h2 id="solucoes-titulo">A solução certa para o momento do seu negócio.</h2>
        </div>

        <div className="solutions-grid">
          {services.map((s, i) => (
            <article key={s.name} className="solution-card" data-reveal="fade-up" data-delay={i * 100}>
              <i className={`${s.icon} solution-icon`} aria-hidden="true"></i>
              <h3>{s.name}</h3>
              <p className="solution-tagline">{s.tagline}</p>
              <p className="solution-description">{s.description}</p>
            </article>
          ))}
        </div>

        <div className="section-cta" data-reveal="fade-up">
          <a
            className="btn btn-primary"
            href={whatsappLink(WHATSAPP_MESSAGES.geral)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Encontrar a solução ideal
          </a>
        </div>
      </div>
    </section>
  );
};

export default Oferecimento;
