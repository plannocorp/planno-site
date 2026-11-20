import React from 'react';
import './problemas-solucoes.css';

interface Comparison {
  hoje: string;
  muda: string;
}

const comparisons: Comparison[] = [
  { hoje: 'Pedidos perdidos nas conversas', muda: 'Pedidos organizados em um painel' },
  { hoje: 'Clientes sem informações claras', muda: 'Serviços e produtos bem apresentados' },
  { hoje: 'Pagamentos conferidos manualmente', muda: 'Checkout integrado' },
  { hoje: 'Dependência das redes sociais', muda: 'Um canal digital próprio' },
  { hoje: 'Dificuldade com tecnologia', muda: 'Implantação acompanhada pela Planno' },
];

export const ProblemasSolucoes: React.FC = () => {
  return (
    <section className="section problemas" id="problemas-e-solucoes" aria-labelledby="problemas-titulo">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Problemas e soluções</span>
          <h2 id="problemas-titulo">Seu negócio não precisa de mais complicações. Precisa de soluções.</h2>
        </div>

        <div className="problemas-table-wrap" data-reveal="fade-up">
          <table className="problemas-table">
            <thead>
              <tr>
                <th scope="col">
                  <i className="fas fa-circle-xmark" aria-hidden="true"></i> O que acontece hoje
                </th>
                <th scope="col">
                  <i className="fas fa-circle-check" aria-hidden="true"></i> O que pode mudar
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c) => (
                <tr key={c.hoje}>
                  <td>{c.hoje}</td>
                  <td>{c.muda}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProblemasSolucoes;
