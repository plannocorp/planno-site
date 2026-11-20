import React from 'react';
import './store-details.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface Highlight {
  icon: string;
  text: string;
}

const highlights: Highlight[] = [
  { icon: 'fas fa-credit-card', text: 'Pagamentos por Pix e cartão via Mercado Pago.' },
  { icon: 'fas fa-boxes-stacked', text: 'Gestão de produtos, estoque e pedidos.' },
  { icon: 'fas fa-lock', text: 'Domínio próprio e conexão segura.' },
  { icon: 'fas fa-palette', text: 'Layout personalizado para sua marca.' },
  { icon: 'fas fa-headset', text: 'Suporte humano durante a implantação.' },
];

export const StoreDetails: React.FC = () => {
  return (
    <section className="section store-details" id="planno-store" aria-labelledby="store-titulo">
      <div className="section-inner store-layout">
        <div className="store-intro" data-reveal="fade-up">
          <span className="eyebrow">Planno Store</span>
          <h2 id="store-titulo">Você vende. A Planno cuida da tecnologia.</h2>
          <p>
            Chega de organizar pedidos em conversas, conferir pagamentos manualmente e depender do direct para realizar suas vendas.
          </p>
          <p>
            Com a Planno Store, você tem uma loja virtual personalizada, com catálogo de produtos, pagamentos integrados e um painel simples para acompanhar seu negócio.
          </p>
          <p>
            Nós cuidamos da implantação para você dedicar seu tempo ao que realmente importa: vender e crescer.
          </p>
          <a
            className="btn btn-primary"
            href={whatsappLink(WHATSAPP_MESSAGES.store)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i> Quero minha loja virtual
          </a>
        </div>

        <div className="store-highlights" data-reveal="fade-up" data-delay="100">
          <h3>Destaques</h3>
          <ul className="store-feature-list">
            {highlights.map((h) => (
              <li key={h.text}>
                <span className="store-feature-icon">
                  <i className={h.icon} aria-hidden="true"></i>
                </span>
                <p>{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StoreDetails;
