import React from 'react';
import { Link } from 'react-router-dom';
import './store-details.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const journey: Feature[] = [
  {
    icon: 'fas fa-list',
    title: 'Catálogo',
    description: 'Vitrine organizada, com fotos, preços e categorias que facilitam a escolha.',
  },
  {
    icon: 'fas fa-cart-shopping',
    title: 'Carrinho',
    description: 'O cliente adiciona os produtos, aplica cupons e segue para o pagamento.',
  },
  {
    icon: 'fas fa-truck',
    title: 'Frete',
    description: 'O valor do envio é calculado na hora, sem troca de mensagens.',
  },
  {
    icon: 'fas fa-credit-card',
    title: 'Pagamento',
    description: 'Checkout seguro dentro da loja, com Mercado Pago.',
  },
];

const admin: Feature[] = [
  {
    icon: 'fas fa-boxes-stacked',
    title: 'Estoque',
    description: 'Saiba o que está disponível e evite vender o que já acabou.',
  },
  {
    icon: 'fas fa-receipt',
    title: 'Pedidos',
    description: 'Acompanhe cada pedido e o status do pagamento, sem planilha.',
  },
  {
    icon: 'fas fa-chart-column',
    title: 'Resumo das vendas',
    description: 'Veja o que mais vende e como a sua loja está indo.',
  },
  {
    icon: 'fas fa-tags',
    title: 'Cupons e promoções',
    description: 'Crie promoções e atraia mais compradores quando quiser.',
  },
];

const FeatureList: React.FC<{ items: Feature[] }> = ({ items }) => (
  <ul className="store-feature-list">
    {items.map((f) => (
      <li key={f.title}>
        <span className="store-feature-icon">
          <i className={f.icon} aria-hidden="true"></i>
        </span>
        <div>
          <h4>{f.title}</h4>
          <p>{f.description}</p>
        </div>
      </li>
    ))}
  </ul>
);

export const StoreDetails: React.FC = () => {
  return (
    <section className="section store-details" id="planno-store">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Planno Store</span>
          <h2>Sua loja vendendo, sem você anotar pedido na mão</h2>
          <p>
            Chega de pedido por mensagem, planilha e conferência de pagamento. Na Planno Store o cliente compra sozinho e você acompanha tudo em um painel simples.
          </p>
        </div>

        <div className="store-columns">
          <div className="store-col" data-reveal="fade-up">
            <h3 className="store-col-title">
              <span>Para o seu cliente</span>
              Comprar é fácil e rápido
            </h3>
            <FeatureList items={journey} />
          </div>

          <div className="store-col" data-reveal="fade-up" data-delay="100">
            <h3 className="store-col-title">
              <span>Para você</span>
              Tudo sob controle em um só lugar
            </h3>
            <FeatureList items={admin} />
          </div>
        </div>

        <div className="store-setup" data-reveal="fade-up">
          <div>
            <h3>Nós montamos a sua loja. Você só vende.</h3>
            <p>
              Cuidamos do design, do domínio, da conexão com o Mercado Pago e do cadastro inicial. Quando a loja for ao ar, é só começar a receber pedidos.
            </p>
          </div>
          <div className="store-setup-actions">
            <a
              className="btn btn-primary"
              href={whatsappLink(WHATSAPP_MESSAGES.store)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i> Quero minha loja
            </a>
            <Link className="btn btn-ghost" to="/planos?aba=store">
              Ver planos da Store
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreDetails;
