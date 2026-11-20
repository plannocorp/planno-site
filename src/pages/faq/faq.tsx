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
      'Landing pages e sites institucionais são orçados de acordo com o que você precisa, e você sabe o valor antes de fechar. A Planno Store parte de R$ 129,90 por mês.',
  },
  {
    question: 'Preciso entender de tecnologia para ter a loja virtual?',
    answer:
      'Não. Nossa equipe cuida da configuração, da integração de pagamento e da implantação inicial. Você recebe a loja pronta e aprende a usar o painel.',
  },
  {
    question: 'Consigo usar meu próprio domínio?',
    answer:
      'Sim. Configuramos o seu site no domínio da sua marca. A loja nasce em um endereço da Planno e pode usar domínio próprio, que é opcional.',
  },
  {
    question: 'Como funcionam os pagamentos na Planno Store?',
    answer:
      'O cliente paga pelo Mercado Pago, com Pix, cartão ou boleto, e o valor cai direto na conta do lojista. Você conecta a sua conta do Mercado Pago pelo painel da loja.',
  },
  {
    question: 'O que a hospedagem e manutenção incluem?',
    answer:
      'Hospedagem, certificado SSL, backups e suporte técnico da Planno, a partir de R$ 65,90 por mês. Os planos têm limites e prazos de atendimento diferentes, que você compara na página de planos.',
  },
  {
    question: 'Posso ver trabalhos que a Planno já fez?',
    answer:
      'Sim. Na seção Projetos você acessa sites que já estão no ar. Se quiser algo parecido, é só chamar no WhatsApp.',
  },
];

export const Faq: React.FC = () => {
  return (
    <section className="section faq" id="faq">
      <div className="faq-container">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2>Tire suas dúvidas antes de decidir</h2>
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
