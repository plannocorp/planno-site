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
    title: 'Entre em contato',
    description: 'Fale diretamente conosco pelo WhatsApp. Alinhamento próximo e humano desde o primeiro contato.',
  },
  {
    stepNum: '02',
    title: 'Alinhamento e Estrutura',
    description: 'Entendemos o catálogo do seu negócio, as suas preferências de identidade visual e de branding.',
  },
  {
    stepNum: '03',
    title: 'Nós configuramos tudo',
    description: 'Criamos o domínio, conectamos seu Mercado Pago, definimos o design e cadastramos as primeiras categorias.',
  },
  {
    stepNum: '04',
    title: 'Comece a vender!',
    description: 'Entregamos a loja 100% configurada. A partir daí, gerencie tudo de forma simples no painel administrativo.',
  },
];

export const ComoFunciona: React.FC = () => {
  return (
    <section className="como-funciona" id="como-funciona">
      <div className="como-funciona-container">
        {/* Cabeçalho centralizado */}
        <div className="como-funciona-header" data-reveal="fade-up">
          <span className="section-badge">
            <i className="fas fa-circle" aria-hidden="true"></i> Fluxo de Contratação
          </span>
          <h2 className="como-funciona-title">
            Sua loja configurada e pronta para vender em 4 passos
          </h2>
        </div>

        {/* Grid com os 4 passos uniformes escalonados */}
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={step.stepNum}
              className="step-card"
              data-reveal="fade-up"
              data-delay={index * 100}
            >
              <span className="step-num">{step.stepNum}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;