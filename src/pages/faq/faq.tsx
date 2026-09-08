import React from 'react';
import './faq.css';

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Preciso entender de tecnologia para ter a loja virtual?',
    answer:
      'Não. Nossa equipe cuida de toda a configuração, integração e implantação inicial. Você recebe a loja pronta e aprende a usar o painel simples.',
  },
  {
    question: 'Consigo usar meu próprio domínio registrado?',
    answer:
      'Sim. Configuramos sua loja ou site sob o seu domínio próprio (ex: www.sualoja.com.br) de forma transparente e segura.',
  },
  {
    question: 'Como funciona o suporte pós-implantação?',
    answer:
      'Oferecemos suporte técnico ativo incluído no seu plano de manutenção mensal para garantir estabilidade, segurança e atualizações da infraestrutura.',
  },
  {
    question: 'O checkout Mercado Pago é seguro?',
    answer:
      'Sim, é um checkout transparente criptografado com SSL. O cliente realiza pagamentos direto na sua loja com Pix ou Cartão com segurança máxima.',
  },
];

export const Faq: React.FC = () => {
  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        {/* Cabeçalho */}
        <div className="faq-header">
          <span className="section-badge">
            <i className="fas fa-circle" aria-hidden="true"></i> Perguntas Frequentes
          </span>
          <h2 className="faq-title">Dúvidas Frequentes</h2>
        </div>

        {/* Grid de Perguntas (2x2 simétrico e elegante) */}
        <div className="faq-grid">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-card">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;