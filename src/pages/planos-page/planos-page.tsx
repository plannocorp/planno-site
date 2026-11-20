import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './planos-page.css';
import { usePageMeta } from '../../hook/use-page-meta';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';
import HeaderAlt from '../../components/header/header-alt/header-alt';
import Footer from '../../components/footer/footer';

type Category = 'criacao' | 'sites' | 'ecommerce';
type BillingCycle = 'mensal' | 'anual';

interface HostingPlan {
  id: string;
  name: string;
  badge: string;
  popular?: boolean;
  desc: string;
  priceMonthly: number;
  priceAnnualTotal: number;
  priceAnnualMonthlyEquivalent: number;
  sla: string;
  emails: string;
  notifications: string;
  features: string[];
}

interface EcommercePlan {
  id: string;
  name: string;
  badge: string;
  popular?: boolean;
  desc: string;
  priceMonthly: number;
  products: string;
  features: string[];
}

const hostingPlans: HostingPlan[] = [
  {
    id: 'basico',
    name: 'Básico',
    badge: 'Início Seguro',
    desc: 'Ideal para sites institucionais, blogs e páginas pessoais de autoridade.',
    priceMonthly: 65.9,
    priceAnnualTotal: 672.99,
    priceAnnualMonthlyEquivalent: 56.08,
    sla: 'Suporte em até 24h',
    emails: '400 emails/dia',
    notifications: '50 WhatsApp/dia',
    features: [
      'Hospedagem profissional de alta velocidade',
      'Verificação e configuração de domínio',
      'Certificado SSL e atualizações de segurança',
      'Backup trimestral automático',
      'Manutenção preventiva contínua',
    ],
  },
  {
    id: 'intermediario',
    name: 'Intermediário',
    badge: 'Mais Recomendado',
    popular: true,
    desc: 'Perfeito para empresas em expansão que exigem agilidade e alterações frequentes.',
    priceMonthly: 129.99,
    priceAnnualTotal: 1325.88,
    priceAnnualMonthlyEquivalent: 110.49,
    sla: 'Suporte prioritário até 12h',
    emails: '4.000 emails/dia',
    notifications: '500 WhatsApp/dia',
    features: [
      'Tudo incluso no Plano Básico',
      'Até 1 alteração de layout/conteúdo por mês',
      'Backup mensal automático dos dados',
      'Otimização mensal de SEO e velocidade',
      'Monitoramento ativo de estabilidade',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Alta Demanda',
    desc: 'Para marcas de alta autoridade que necessitam de SLA VIP e suporte sob demanda.',
    priceMonthly: 259.99,
    priceAnnualTotal: 2651.88,
    priceAnnualMonthlyEquivalent: 220.99,
    sla: 'Suporte VIP em até 6h',
    emails: '40.000 emails/dia',
    notifications: '5.000 WhatsApp/dia',
    features: [
      'Tudo incluso no Plano Intermediário',
      'Até 3 alterações de estilo e páginas por mês',
      'Backup semanal automático com restauração rápida',
      'SSL Corporativo e monitoramento de uptime 24/7',
      'Consultoria estratégica direta com os desenvolvedores',
    ],
  },
];

interface CreationPlan {
  id: string;
  name: string;
  badge: string;
  desc: string;
  features: string[];
  message: string;
}

const creationPlans: CreationPlan[] = [
  {
    id: 'landing',
    name: 'Landing page',
    badge: 'Captação de contatos',
    desc: 'Uma página objetiva para divulgar um serviço, lançar um produto ou captar contatos.',
    features: [
      'Design responsivo, otimizado para celulares',
      'Otimização de velocidade e SEO',
      'Desenvolvido sob medida para a sua marca',
      'Publicação com a nossa equipe',
    ],
    message: WHATSAPP_MESSAGES.landing,
  },
  {
    id: 'institucional',
    name: 'Site institucional',
    badge: 'Presença profissional',
    desc: 'Um site com várias páginas para apresentar sua empresa e ganhar autoridade digital.',
    features: [
      'Páginas e estrutura sob medida',
      'Identidade visual alinhada à marca',
      'Design responsivo, otimizado para celulares',
      'Otimização de velocidade e SEO',
      'Publicação com a nossa equipe',
    ],
    message: WHATSAPP_MESSAGES.site,
  },
];

// Planos e preços alinhados ao catálogo do Planno Hub / Planno Store (Inicial, Intermediário, Avançado).
const ecommercePlans: EcommercePlan[] = [
  {
    id: 'inicial',
    name: 'Inicial',
    badge: 'Para começar',
    desc: 'Tudo o que você precisa para abrir a sua loja e começar a vender.',
    priceMonthly: 129.9,
    products: 'Catálogo, estoque e pedidos',
    features: [
      'Painel administrativo da loja',
      'Catálogo de produtos com categorias e imagens',
      'Controle de estoque',
      'Carrinho, cupons e formas de entrega',
      'Pagamento pelo Mercado Pago',
      'Implantação feita pela equipe Planno',
    ],
  },
  {
    id: 'intermediario',
    name: 'Intermediário',
    badge: 'Mais escolhido',
    popular: true,
    desc: 'Para quem já vende e quer acompanhar o crescimento de perto.',
    priceMonthly: 179.9,
    products: 'Tudo do Inicial',
    features: [
      'Tudo incluso no plano Inicial',
      'Resumo de vendas, produtos mais vendidos e pedidos recentes',
      'Promoções e cupons de desconto',
    ],
  },
  {
    id: 'avancado',
    name: 'Avançado',
    badge: 'Para crescer',
    desc: 'Para operações maiores, com atendimento ainda mais próximo.',
    priceMonthly: 259.9,
    products: 'Tudo do Intermediário',
    features: [
      'Tudo incluso no plano Intermediário',
      'Atendimento direto com a equipe Planno',
    ],
  },
];

export const PlanosPage: React.FC = () => {
  usePageMeta(
    'Planos e valores | Planno',
    'Landing pages e sites institucionais sob orçamento, Planno Store a partir de R$ 129,90/mês e planos de hospedagem e manutenção.'
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('aba');
  // A aba ativa vem da URL (?aba=...), então os links de outras seções sempre funcionam.
  const category: Category = tab === 'manutencao' ? 'sites' : tab === 'store' ? 'ecommerce' : 'criacao';
  const setCategory = (c: Category) =>
    setSearchParams({ aba: c === 'sites' ? 'manutencao' : c === 'ecommerce' ? 'store' : 'criacao' }, { replace: true });
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('mensal');

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getWhatsAppLink = (planName: string, type: 'hospedagem' | 'ecommerce') => {
    if (type === 'ecommerce') {
      return whatsappLink(
        `Olá! Tenho interesse na Planno Store, plano ${planName}. Poderiam me orientar com o próximo passo?`
      );
    }
    const cycleText = billingCycle === 'anual' ? 'Anual (com 15% de desconto)' : 'Mensal';
    return whatsappLink(
      `Olá! Tenho interesse no plano de hospedagem e manutenção ${planName}, ciclo ${cycleText}. Poderiam me orientar com o próximo passo?`
    );
  };

  return (
    <>
      <HeaderAlt />

      <main className="planos-page">
        <section className="pricing-hero">
          <div className="pricing-hero-grid" aria-hidden="true"></div>

          <div className="pricing-container">
            <div className="hero-status-pill">
              <span className="status-beacon">
                <span className="beacon-ping"></span>
                <span className="beacon-dot"></span>
              </span>
              <span>Preços transparentes</span>
            </div>

            <h1 className="pricing-hero-title">
              Escolha o seu plano e comece a vender
            </h1>

            <p className="pricing-hero-desc">
              Crie o seu site, abra a sua loja com a Planno Store ou mantenha tudo no ar com a nossa manutenção.
            </p>

            <div className="hero-control-dock">
              {/* Seletor Estilo Cockpit Interativo */}
              <div className="category-switcher" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={category === 'criacao'}
                  className={`category-btn ${category === 'criacao' ? 'active' : ''}`}
                  onClick={() => setCategory('criacao')}
                >
                  <div className="category-icon-box">
                    <i className="fas fa-laptop-code" aria-hidden="true"></i>
                  </div>
                  <div className="category-btn-text">
                    <span className="category-btn-title">Criação de sites</span>
                    <span className="category-btn-sub">Landing page e site institucional</span>
                  </div>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={category === 'sites'}
                  className={`category-btn ${category === 'sites' ? 'active' : ''}`}
                  onClick={() => setCategory('sites')}
                >
                  <div className="category-icon-box">
                    <i className="fas fa-server" aria-hidden="true"></i>
                  </div>
                  <div className="category-btn-text">
                    <span className="category-btn-title">Hospedagem e manutenção</span>
                    <span className="category-btn-sub">Seu site no ar, seguro e atualizado</span>
                  </div>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={category === 'ecommerce'}
                  className={`category-btn ${category === 'ecommerce' ? 'active' : ''}`}
                  onClick={() => setCategory('ecommerce')}
                >
                  <div className="category-icon-box">
                    <i className="fas fa-bag-shopping" aria-hidden="true"></i>
                  </div>
                  <div className="category-btn-text">
                    <span className="category-btn-title">Planno Store</span>
                    <span className="category-btn-sub">Loja virtual com catálogo e checkout</span>
                  </div>
                </button>
              </div>

              {/* Chaveador Mensal / Anual */}
              {category === 'sites' && (
                <div className="billing-toggle-wrapper">
                  <span className={billingCycle === 'mensal' ? 'active-label' : ''}>Mensal</span>
                  <button
                    type="button"
                    className={`billing-switch ${billingCycle === 'anual' ? 'active' : ''}`}
                    onClick={() => setBillingCycle(billingCycle === 'mensal' ? 'anual' : 'mensal')}
                    aria-label="Alternar ciclo de faturamento"
                  >
                    <span className="switch-handle"></span>
                  </button>
                  <span className={billingCycle === 'anual' ? 'active-label' : ''}>
                    Anual <span className="discount-pill">Economize 15%</span>
                  </span>
                </div>
              )}

              {/* Micro-faixa de benefícios da infraestrutura */}
              <div className="hero-trust-strip">
                <div className="trust-item">
                  <i className="fas fa-bolt" aria-hidden="true"></i>
                  <span>Hospedagem rápida</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-shield-halved" aria-hidden="true"></i>
                  <span>SSL e backups</span>
                </div>
                <div className="trust-item">
                  <i className="fab fa-whatsapp" aria-hidden="true"></i>
                  <span>Atendimento humano no WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Cards dos Planos */}
        <section className="pricing-cards-section">
          <div className="pricing-container">
            {category === 'criacao' ? (
              <div className="pricing-grid pricing-grid-two">
                {creationPlans.map((plan) => (
                  <div key={plan.id} className="plan-card-item">
                    <div className="card-badge-row">
                      <span className="plan-type-badge">{plan.badge}</span>
                    </div>
                    <div className="plan-card-header">
                      <h2 className="plan-name-heading">{plan.name}</h2>
                      <p className="plan-summary">{plan.desc}</p>
                    </div>
                    <div className="plan-price-box">
                      <strong className="main-price-number price-custom">Peça seu orçamento</strong>
                    </div>
                    <span className="annual-savings-tag">Orçamento sob medida, sem compromisso</span>
                    <ul className="plan-features-list">
                      {plan.features.map((feat) => (
                        <li key={feat}>
                          <i className="fas fa-circle-check" aria-hidden="true"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappLink(plan.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="plan-contract-btn"
                    >
                      Pedir orçamento <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    </a>
                  </div>
                ))}
              </div>
            ) : category === 'sites' ? (
              <div className="pricing-grid">
                {hostingPlans.map((plan) => {
                  const displayPrice =
                    billingCycle === 'anual'
                      ? plan.priceAnnualMonthlyEquivalent
                      : plan.priceMonthly;

                  return (
                    <div
                      key={plan.id}
                      className={`plan-card-item ${plan.popular ? 'plan-card-featured' : ''}`}
                    >
                      {/* Linha superior de selos */}
                      <div className="card-badge-row">
                        <span className="plan-type-badge">{plan.badge}</span>
                        {plan.popular && (
                          <span className="plan-popular-pill">
                            <i className="fas fa-crown" aria-hidden="true"></i> Mais Escolhido
                          </span>
                        )}
                      </div>

                      <div className="plan-card-header">
                        <h2 className="plan-name-heading">{plan.name}</h2>
                        <p className="plan-summary">{plan.desc}</p>
                      </div>

                      {/* Caixa de Preço */}
                      <div className="plan-price-box">
                        <span className="currency-symbol">R$</span>
                        <strong className="main-price-number">{formatCurrency(displayPrice)}</strong>
                        <span className="price-frequency">/mês</span>
                      </div>

                      {billingCycle === 'anual' && (
                        <span className="annual-savings-tag">
                          Faturado anualmente: R$ {formatCurrency(plan.priceAnnualTotal)}
                        </span>
                      )}

                      {/* Métricas e SLAs do Plano */}
                      <div className="plan-metrics-block">
                        <div className="metric-chip">
                          <i className="fas fa-headset" aria-hidden="true"></i>
                          <span>{plan.sla}</span>
                        </div>
                        <div className="metric-chip">
                          <i className="fas fa-envelope" aria-hidden="true"></i>
                          <span>{plan.emails}</span>
                        </div>
                        <div className="metric-chip">
                          <i className="fab fa-whatsapp" aria-hidden="true"></i>
                          <span>{plan.notifications}</span>
                        </div>
                      </div>

                      {/* Lista de Recursos */}
                      <ul className="plan-features-list">
                        {plan.features.map((feat, fIndex) => (
                          <li key={fIndex}>
                            <i className="fas fa-circle-check" aria-hidden="true"></i>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Botão de Contratação */}
                      <a
                        href={getWhatsAppLink(plan.name, 'hospedagem')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`plan-contract-btn ${plan.popular ? 'btn-primary-glow' : ''}`}
                      >
                        Contratar {plan.name} <i className="fab fa-whatsapp" aria-hidden="true"></i>
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="pricing-grid">
                {ecommercePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`plan-card-item ${plan.popular ? 'plan-card-featured' : ''}`}
                  >
                    {/* Linha superior de selos */}
                    <div className="card-badge-row">
                      <span className="plan-type-badge">{plan.badge}</span>
                      {plan.popular && (
                        <span className="plan-popular-pill">
                          <i className="fas fa-crown" aria-hidden="true"></i> Mais Escolhido
                        </span>
                      )}
                    </div>

                    <div className="plan-card-header">
                      <h2 className="plan-name-heading">{plan.name}</h2>
                      <p className="plan-summary">{plan.desc}</p>
                    </div>

                    {/* Preço */}
                    <div className="plan-price-box">
                      <span className="currency-symbol">R$</span>
                      <strong className="main-price-number">{formatCurrency(plan.priceMonthly)}</strong>
                      <span className="price-frequency">/mês</span>
                    </div>

                    <span className="annual-savings-tag">Implantação feita pela equipe Planno</span>

                    {/* Destaque de capacidade */}
                    <div className="plan-metrics-block">
                      <div className="metric-chip highlight-chip">
                        <i className="fas fa-layer-group" aria-hidden="true"></i>
                        <span>{plan.products}</span>
                      </div>
                    </div>

                    {/* Recursos */}
                    <ul className="plan-features-list">
                      {plan.features.map((feat, fIndex) => (
                        <li key={fIndex}>
                          <i className="fas fa-circle-check" aria-hidden="true"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={getWhatsAppLink(plan.name, 'ecommerce')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`plan-contract-btn ${plan.popular ? 'btn-primary-glow' : ''}`}
                    >
                      Contratar {plan.name} <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Seção Demonstrativa: O que vem incluso em todos os planos */}
        <section className="included-perks-section">
          <div className="pricing-container">
            <div className="perks-header">
              <span className="section-badge">
                <i className="fas fa-shield-halved" aria-hidden="true"></i> Padrão de Qualidade Planno
              </span>
              <h2>Incluso em todos os planos</h2>
              <p>Em qualquer plano, você conta com segurança, velocidade e atendimento de verdade.</p>
            </div>

            <div className="perks-grid">
              <div className="perk-card">
                <div className="perk-icon-box">
                  <i className="fas fa-lock" aria-hidden="true"></i>
                </div>
                <h3>Segurança e SSL Ativo</h3>
                <p>Certificados de segurança renovados automaticamente sem custo adicional.</p>
              </div>

              <div className="perk-card">
                <div className="perk-icon-box">
                  <i className="fas fa-cloud-arrow-up" aria-hidden="true"></i>
                </div>
                <h3>Backups Automáticos</h3>
                <p>Seus arquivos e banco de dados protegidos com cópias de segurança periódicas.</p>
              </div>

              <div className="perk-card">
                <div className="perk-icon-box">
                  <i className="fas fa-gauge-high" aria-hidden="true"></i>
                </div>
                <h3>Velocidade Otimizada</h3>
                <p>Servidores modernos com tempo de carregamento acelerado para encantar seus clientes.</p>
              </div>

              <div className="perk-card">
                <div className="perk-icon-box">
                  <i className="fas fa-comments" aria-hidden="true"></i>
                </div>
                <h3>Atendimento Próximo</h3>
                <p>Fale diretamente com os especialistas que cuidam do seu site via WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Final */}
        <section className="custom-project-cta">
          <div className="pricing-container">
            <div className="cta-box-content">
              <div>
                <span className="section-badge">
                  <i className="fas fa-lightbulb" aria-hidden="true"></i> Projeto Sob Medida
                </span>
                <h2>Não achou o que procura? Vamos montar juntos.</h2>
                <p>Conte o que você precisa e a nossa equipe indica o melhor caminho para o seu negócio.</p>
              </div>

              <a
                href={whatsappLink('Olá! Gostaria de conversar com um especialista sobre um projeto personalizado da Planno.')}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-contact-button btn-whatsapp-hover"
              >
                Falar com um especialista <i className="fab fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PlanosPage;