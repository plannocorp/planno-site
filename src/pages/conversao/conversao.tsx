import React from 'react';
import './conversao.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

export const Conversao: React.FC = () => {
  return (
    <section className="section conversao" id="contato" aria-labelledby="conversao-titulo">
      <div className="section-inner">
        <div className="conversao-box" data-reveal="fade-up">
          <h2 id="conversao-titulo">Seu próximo cliente pode estar procurando você agora.</h2>
          <p className="conversao-question">A pergunta é: o que ele vai encontrar?</p>
          <p>
            Seja um site profissional, uma landing page ou uma loja virtual completa, a Planno ajuda você a construir uma presença digital à altura do seu negócio.
          </p>
          <a
            className="btn btn-primary"
            href={whatsappLink(WHATSAPP_MESSAGES.geral)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i> Vamos conversar sobre seu projeto
          </a>
        </div>
      </div>
    </section>
  );
};

export default Conversao;
