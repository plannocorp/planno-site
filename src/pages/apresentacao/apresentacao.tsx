import React from 'react';
import './apresentacao.css';

export const Apresentacao: React.FC = () => {
  return (
    <section className="section apresentacao" id="apresentacao" aria-labelledby="apresentacao-titulo">
      <div className="section-inner apresentacao-inner">
        <h2 id="apresentacao-titulo" data-reveal="fade-up">
          Sua marca evolui. Seu digital também precisa acompanhar.
        </h2>

        <div className="apresentacao-text" data-reveal="fade-up" data-delay="100">
          <p>Seu cliente pesquisa, compara e forma opiniões antes mesmo de entrar em contato.</p>
          <p className="apresentacao-question">
            E quando ele encontra sua empresa, o que sua presença digital comunica?
          </p>
          <p>
            Na Planno, desenvolvemos experiências digitais que unem identidade, funcionalidade e estratégia para valorizar seu negócio e facilitar a conexão com seus próximos clientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Apresentacao;
