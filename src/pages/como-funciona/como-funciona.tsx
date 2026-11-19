import React from 'react';
import './como-funciona.css';

interface Step {
  stepNum: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    stepNum: '01',
    title: 'Você chama no WhatsApp',
    description: 'Conte a sua ideia e tire as dúvidas direto com quem faz o projeto.',
  },
  {
    stepNum: '02',
    title: 'Você recebe um orçamento claro',
    description: 'Você sabe o que vai receber e quanto vai pagar antes de começar.',
  },
  {
    stepNum: '03',
    title: 'Nós criamos tudo',
    description: 'Design, domínio e configurações, e na loja, pagamentos e cadastro inicial.',
  },
  {
    stepNum: '04',
    title: 'Você começa a vender',
    description: 'Projeto no ar e suporte para o que você precisar.',
  },
];

export const ComoFunciona: React.FC = () => {
  return (
    <section className="section como-funciona" id="como-funciona">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Como funciona</span>
          <h2>Simples do começo ao fim</h2>
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
      </div>
    </section>
  );
};

export default ComoFunciona;
