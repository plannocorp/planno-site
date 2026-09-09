import React from 'react';
import '../termos-de-uso-page/termos-de-uso-page.css'; // Compartilha o mesmo CSS limpo de páginas jurídicas
import HeaderAlt from '../../components/header/header-alt/header-alt';
import Footer from '../../components/footer/footer';

export const PoliticaPrivacidade: React.FC = () => {
  return (
    <>
      <HeaderAlt />

      <main className="legal-page">
        <section className="legal-hero">
          <div className="legal-container">
            <span className="section-badge">
              <i className="fas fa-circle" aria-hidden="true"></i> Privacidade Planno
            </span>

            <h1 className="legal-title">Política de Privacidade</h1>

            <p className="legal-desc">
              Esta política explica como a Planno trata dados pessoais em seu site, formulários de
              contato, negociações, contratação de sites, landing pages, hospedagem e ecommerces.
            </p>

            <span className="legal-updated">Última atualização: abril de 2026</span>
          </div>
        </section>

        <section className="legal-content">
          <div className="legal-container">
            <article className="legal-card">
              <h2 className="legal-card-title">1. Quem é o controlador dos dados</h2>
              <p className="legal-card-text">
                A Planno é responsável pelo tratamento dos dados pessoais coletados diretamente em seus
                canais digitais e comerciais. Em projetos de clientes, a Planno também pode atuar como
                operadora de dados quando trata informações em nome do contratante.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">2. Dados que podemos coletar</h2>
              <p className="legal-card-text">
                Podemos coletar nome, e-mail, telefone, empresa, assunto, mensagem enviada, preferências
                comerciais, informações necessárias para proposta, dados técnicos de acesso ao site e
                informações essenciais para contratação, cobrança e suporte.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">3. Para que usamos os dados</h2>
              <ul className="legal-list">
                <li><i className="fas fa-check" aria-hidden="true"></i> Responder contatos, dúvidas e solicitações de orçamento.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Elaborar propostas, contratos e escopos de projeto.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Prestar suporte, hospedagem, manutenção e melhoria dos serviços.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Cumprir obrigações legais, regulatórias, fiscais e contratuais.</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Proteger nossos sistemas, clientes e usuários contra uso indevido.</li>
              </ul>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">4. Bases legais</h2>
              <p className="legal-card-text">
                O tratamento pode ocorrer com base em execução de contrato, procedimentos preliminares a
                contrato, cumprimento de obrigação legal, legítimo interesse, consentimento quando
                aplicável e exercício regular de direitos.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">5. Compartilhamento</h2>
              <p className="legal-card-text">
                Dados podem ser compartilhados com provedores necessários para execução dos serviços,
                como hospedagem, e-mail, automação, atendimento, análise técnica e meios de pagamento. A
                Planno não vende dados pessoais.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">6. Cookies e dados técnicos</h2>
              <p className="legal-card-text">
                Podemos usar cookies e tecnologias similares para funcionamento do site, segurança,
                métricas e melhoria de experiência. O usuário pode ajustar preferências no navegador, mas
                alguns recursos podem depender dessas tecnologias.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">7. Segurança e retenção</h2>
              <p className="legal-card-text">
                Adotamos medidas técnicas e administrativas razoáveis para proteger dados pessoais.
                Mantemos informações pelo tempo necessário para cumprir as finalidades informadas,
                obrigações legais, prevenção a fraudes e exercício de direitos.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">8. Direitos do titular</h2>
              <p className="legal-card-text">
                Conforme a LGPD, você pode solicitar confirmação de tratamento, acesso, correção,
                anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento,
                revisão de decisões automatizadas e revogação de consentimento quando aplicável.
              </p>
            </article>

            <article className="legal-card">
              <h2 className="legal-card-title">9. Contato sobre privacidade</h2>
              <p className="legal-card-text">
                Para exercer direitos ou tirar dúvidas sobre privacidade, fale com a Planno pelo
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

export default PoliticaPrivacidade;