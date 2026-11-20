import React from 'react';
import './como-funciona.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface Step {
  stepNum: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    stepNum: '01',
    title: 'Você conta sua ideia.',
    description: 'Entendemos seu negócio, seus objetivos e o que você precisa.',
  },
  {
    stepNum: '02',
    title: 'Planejamos a solução.',
    description: 'Definimos a estrutura, as funcionalidades e a identidade do projeto.',
  },
  {
    stepNum: '03',
    title: 'Colocamos a mão no código.',
    description: 'Desenvolvemos, personalizamos e configuramos sua solução digital.',
  },
  {
    stepNum: '04',
    title: 'Seu projeto ganha vida.',
    description: 'Publicamos, orientamos você sobre o uso e seguimos com o suporte contratado.',
  },
];

export const ComoFunciona: React.FC = () => {
  return (
    <section className="section como-funciona" id="como-funciona" aria-labelledby="como-funciona-titulo">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Como funciona</span>
          <h2 id="como-funciona-titulo">Da sua ideia ao digital. Sem complicar.</h2>
        </div>

        <ol className="steps-grid">
          {steps.map((step, index) => (
            <li
              key={step.stepNum}
              className="step-card"
              data-reveal="fade-up"
              data-delay={index * 80}
            >
              <span className="step-num">{step.stepNum}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="section-cta" data-reveal="fade-up">
          <a
            className="btn btn-primary"
            href={whatsappLink(WHATSAPP_MESSAGES.geral)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tirar meu projeto do papel
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
