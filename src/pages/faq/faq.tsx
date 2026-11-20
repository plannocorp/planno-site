import React from 'react';
import './faq.css';

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Quanto custa um site ou uma loja virtual?',
    answer:
      'Sites e Landing Pages partem de R$ 65,90/mês, com hospedagem, SSL e suporte técnico conforme o plano contratado. A Planno Store parte de R$ 129,90/mês, com gestão de produtos e integração de pagamentos. O desenvolvimento de cada site é planejado com você, e você conhece o valor antes de começar.',
  },
  {
    question: 'Preciso entender de tecnologia?',
    answer:
      'Não. Cuidamos da parte técnica para você focar no seu negócio. Desenvolvemos, personalizamos e configuramos sua solução, publicamos e orientamos você sobre o uso.',
  },
  {
    question: 'Consigo usar meu próprio domínio?',
    answer:
      'Sim. Sites, landing pages e a Planno Store funcionam com domínio próprio e conexão segura (SSL).',
  },
  {
    question: 'Como funcionam os pagamentos na Planno Store?',
    answer:
      'Os pagamentos são feitos por Pix e cartão via Mercado Pago, com checkout integrado à loja. O valor cai direto na sua conta do Mercado Pago, e você acompanha os pedidos em um painel simples.',
  },
  {
    question: 'O que está incluso nos planos de Sites e Landing Pages?',
    answer:
      'Hospedagem, SSL e suporte técnico conforme o plano contratado, a partir de R$ 65,90/mês. Os planos têm limites e prazos de atendimento diferentes, que você compara na página de planos.',
  },
  {
    question: 'A Planno some depois de entregar o projeto?',
    answer:
      'Não. Você conversa com quem entende do desenvolvimento, acompanha o projeto de perto e conta com atendimento humano nas etapas do projeto e no suporte previsto em seu plano.',
  },
  {
    question: 'Posso ver trabalhos que a Planno já fez?',
    answer:
      'Sim. Na página Projetos você acessa sites que já estão no ar. Se quiser algo parecido, é só conversar com a gente.',
  },
];

export const Faq: React.FC = () => {
  return (
    <section className="section faq" id="faq">
      <div className="faq-container">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Perguntas frequentes</span>
          <h1>Tire suas dúvidas antes de decidir</h1>
        </div>

        <div className="faq-list" data-reveal="fade-up">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
