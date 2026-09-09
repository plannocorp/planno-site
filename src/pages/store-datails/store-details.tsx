import React from 'react';
import './store-details.css';

interface Item {
  title: string;
  description: string;
}

const dores: Item[] = [
  {
    title: 'Pedidos caóticos no WhatsApp',
    description: 'Perder tempo processando pagamentos, anotando endereços e calculando frete de forma manual.',
  },
  {
    title: 'Dependência do Direct do Instagram',
    description: 'Ficar refém de algoritmos e de responder a mensagens a todo momento para conseguir fechar vendas.',
  },
  {
    title: 'Falta de credibilidade online',
    description: 'Não possuir uma identidade visual forte ou uma loja estruturada passa insegurança para os seus clientes.',
  },
];

const solucoes: Item[] = [
  {
    title: 'Checkout Transparente e Integrado',
    description: 'Seus clientes compram via Pix ou cartão com segurança através do Mercado Pago direto na sua loja.',
  },
  {
    title: 'Painel Completo e Controle Total',
    description: 'Gestão simples de estoque, controle de envio e catálogo de produtos atualizado de forma centralizada.',
  },
  {
    title: 'Suporte Integral na Implantação',
    description: 'Nossa equipe faz todo o trabalho técnico pesado. Configuramos a identidade, produtos e meios de pagamento.',
  },
];

export const StoreDetails: React.FC = () => {
  return (
    <section className="store-details" id="planno-store-detalhes">
      <div className="store-details-container">
        <div className="store-details-grid">
          {/* Coluna 1: Dores do Mercado */}
          <div className="comparison-box dores-box" data-reveal="slide-left" data-delay="0">
            <span className="section-badge negative">
              <i className="fas fa-circle" aria-hidden="true"></i> Dificuldades no Mercado
            </span>
            <h2 className="comparison-title">
              Cansado de processos manuais e caóticos para vender?
            </h2>

            <div className="comparison-items">
              {dores.map((dor, index) => (
                <div key={index} className="comparison-item dor-item">
                  <div className="item-icon-wrapper dor-icon">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                  </div>
                  <div className="item-content">
                    <h3>{dor.title}</h3>
                    <p>{dor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Soluções Planno Store */}
          <div className="comparison-box solucoes-box" data-reveal="slide-right" data-delay="150">
            <span className="section-badge positive">
              <i className="fas fa-circle" aria-hidden="true"></i> Como a Planno Store resolve
            </span>
            <h2 className="comparison-title">
              Tudo o que sua loja precisa em um único ecossistema
            </h2>

            <div className="comparison-items">
              {solucoes.map((sol, index) => (
                <div key={index} className="comparison-item sol-item">
                  <div className="item-icon-wrapper sol-icon">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                  </div>
                  <div className="item-content">
                    <h3>{sol.title}</h3>
                    <p>{sol.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreDetails;