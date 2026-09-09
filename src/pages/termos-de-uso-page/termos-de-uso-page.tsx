import React from 'react';
import './termos-de-uso-page.css';
import HeaderAlt from '../../components/header/header-alt/header-alt';
import Footer from '../../components/footer/footer';

export const TermosDeUsoPage: React.FC = () => {
  return (
    <>
      <HeaderAlt />

      <main className="legal-page">
        <section className="legal-hero">
          <div className="legal-container">
            <span className="section-badge">
              <i className="fas fa-circle" aria-hidden="true"></i> Regras de uso
            </span>

            <h1 className="legal-title">Termos de Uso</h1>

            <p className="legal-desc">
              Estes termos regulam o acesso ao site da Planno e a contratação de serviços de sites,
              landing pages, blogs, hospedagem, manutenção e ecommerces.
            </p>

            <span className="legal-updated">Última atualização: abril de 2026</span>
          </div>
        </section>

        <section className="legal-content">
          <div className="legal-container">
            <article className="legal-card">
              <h2 className="legal-card-title">1. Aceitação</h2>
              <p className="legal-card-text">
                Ao acessar o site, solicitar orçamento, contratar serviços ou utilizar soluções da
                Planno, você declara que leu e concorda com estes Termos de Uso e com a Política de
                Privacidade.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">2. Serviços oferecidos</h2>
              <ul className="legal-list">
                <li><i className="fas fa-check" aria-hidden="true"></i> Desenvolvimento de landing pages, sites institucionais, blogs e páginas pessoais.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Criação e manutenção de ecommerces com planos Start, Pro e Premium.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Hospedagem, domínio, SSL, manutenção, suporte e automações conforme plano contratado.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Serviços personalizados definidos em proposta, contrato ou escopo específico.</li>
              </ul>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">3. Propostas, escopo e prazos</h2>
              <p className="legal-card-text">
                Projetos de desenvolvimento são definidos após levantamento de requisitos. Prazos,
                entregáveis, valores e limites de revisão devem constar em proposta ou contrato. Mudanças
                fora do escopo podem gerar novo orçamento.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">4. Planos, mensalidade e recursos</h2>
              <p className="legal-card-text">
                Planos de hospedagem e ecommerce possuem recursos próprios, como limites de produtos,
                e-mails, notificações, backups, suporte e alterações mensais. A disponibilidade de
                domínio depende de verificação no momento da contratação.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">5. Pagamentos e suspensão</h2>
              <p className="legal-card-text">
                Valores, vencimentos, formas de pagamento e eventuais descontos serão informados na
                contratação. Atrasos podem causar suspensão de suporte, hospedagem, automações ou acesso
                ao serviço até a regularização.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">6. Responsabilidades do cliente</h2>
              <ul className="legal-list">
                <li><i className="fas fa-check" aria-hidden="true"></i> Fornecer informações, textos, imagens e acessos corretos quando necessários.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Garantir que possui direitos de uso sobre conteúdos enviados.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Usar o site e as integrações de forma lícita e compatível com a legislação brasileira.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Manter dados de pagamento e contato atualizados.</li>
              </ul>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">7. Propriedade intelectual</h2>
              <p className="legal-card-text">
                A identidade visual, textos e materiais fornecidos pelo cliente continuam pertencendo ao
                cliente ou a seus titulares. Códigos, componentes, bibliotecas, templates e estruturas
                técnicas da Planno podem ser reutilizados em outros projetos, salvo acordo escrito em
                sentido diferente.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">8. Limitações e disponibilidade</h2>
              <p className="legal-card-text">
                A Planno atua para manter serviços estáveis, seguros e atualizados, mas pode haver
                indisponibilidades por manutenção, falhas de terceiros, provedores, meios de pagamento,
                internet ou eventos fora do controle razoável da empresa.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">9. Cancelamento e alterações</h2>
              <p className="legal-card-text">
                O cancelamento, migração ou alteração de plano deve ser solicitado pelos canais oficiais.
                A Planno pode atualizar estes termos, preços e condições, preservando contratos vigentes
                quando houver regra específica acordada.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">10. Lei aplicável e contato</h2>
              <p className="legal-card-text">
                Estes termos são regidos pela legislação brasileira. Dúvidas podem ser enviadas pelo
                formulário de contato do site ou pelo e-mail contato@planno.com.br.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TermosDeUsoPage;