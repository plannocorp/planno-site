import React, { useState } from 'react';
import './planos-page.css';
import HeaderAlt from '../../components/header/header-alt/header-alt';
import Footer from '../../components/footer/footer';

type Category = 'sites' | 'ecommerce';
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
    priceMonthly: 65.99,
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

const ecommercePlans: EcommercePlan[] = [
  {
    id: 'start',
    name: 'Start',
    badge: 'Para Começar',
    desc: 'Estrutura completa e profissional para iniciar suas vendas online com segurança.',
    priceMonthly: 99.90,
    products: 'Até 150 produtos cadastrados',
    features: [
      'Domínio .com.br próprio incluso',
      'Checkout transparente Mercado Pago (Pix & Cartão)',
      'Cálculo de frete automático integrado',
      'Painel intuitivo de controle de estoque e pedidos',
      'Notificações automáticas por e-mail',
      'Hospedagem e suporte técnico inclusos',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'O Mais Vendido',
    popular: true,
    desc: 'Para lojas que querem acelerar o faturamento com recuperação de vendas e métricas.',
    priceMonthly: 139.90,
    products: 'Até 500 produtos cadastrados',
    features: [
      'Tudo incluso no Plano Start',
      'Recuperação inteligente de carrinhos abandonados',
      'Painel de métricas financeiras e faturamento em tempo real',
      'Cupons de desconto e promoções personalizadas',
      'Otimização de checkout para conversão mobile',
      'Suporte técnico prioritário',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    badge: 'Escala Total',
    desc: 'Máxima capacidade, produtos ilimitados e automações avançadas de pós-venda.',
    priceMonthly: 259.90,
    products: 'Produtos e categorias ilimitados',
    features: [
      'Tudo incluso no Plano Pro',
      'Automações avançadas de e-mail marketing pós-venda',
      'Integração multi-canais e alta escalabilidade',
      'Servidor dedicado com performance otimizada',
      'Atendimento prioritário em canal exclusivo',
      'Auditorias mensais de usabilidade e conversão',
    ],
  },
];

export const PlanosPage: React.FC = () => {
  const [category, setCategory] = useState<Category>('sites');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('mensal');

  const whatsappNumber = '5562984458858';

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getWhatsAppLink = (planName: string, type: 'hospedagem' | 'ecommerce') => {
    const cycleText = billingCycle === 'anual' ? 'Anual (com 15% de desconto)' : 'Mensal';
    const message = encodeURIComponent(
      `Olá! Tenho interesse em contratar o plano ${planName} (${type === 'ecommerce' ? 'Planno Store Ecommerce' : 'Hospedagem de Sites'}) no ciclo ${cycleText}. Poderiam me orientar com o próximo passo?`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <>
      <HeaderAlt />

      <main className="planos-page">
                {/* Hero Centralizado Reinventado */}
        <section className="pricing-hero">
          <div className="pricing-hero-grid" aria-hidden="true"></div>

          <div className="pricing-container">
            <div className="hero-status-pill">
              <span className="status-beacon">
                <span className="beacon-ping"></span>
                <span className="beacon-dot"></span>
              </span>
              <span>Infraestrutura Cloud & Performance Operacional</span>
            </div>

            <h1 className="pricing-hero-title">
              A tecnologia certa para a sua marca <span className="hero-gradient-text">escalar e converter.</span>
            </h1>

            <p className="pricing-hero-desc">
              Sem taxas surpresa ou configurações complexas. Escolha entre servidores dedicados para sites institucionais ou o ecossistema completo de vendas da Planno Store.
            </p>

            <div className="hero-control-dock">
              {/* Seletor Estilo Cockpit Interativo */}
              <div className="category-switcher" role="tablist">
                <button
                  type="button"
                  className={`category-btn ${category === 'sites' ? 'active' : ''}`}
                  onClick={() => setCategory('sites')}
                >
                  <div className="category-icon-box">
                    <i className="fas fa-globe" aria-hidden="true"></i>
                  </div>
                  <div className="category-btn-text">
                    <span className="category-btn-title">Sites & Landing Pages</span>
                    <span className="category-btn-sub">Hospedagem rápida, blogs e autoridade</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`category-btn ${category === 'ecommerce' ? 'active' : ''}`}
                  onClick={() => setCategory('ecommerce')}
                >
                  <div className="category-icon-box">
                    <i className="fas fa-bag-shopping" aria-hidden="true"></i>
                  </div>
                  <div className="category-btn-text">
                    <span className="category-btn-title">Planno Store (E-commerce)</span>
                    <span className="category-btn-sub">Loja virtual completa, frete e checkout</span>
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
                  <span>Servidores NVMe Ultra-rápidos</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-shield-halved" aria-hidden="true"></i>
                  <span>SSL & Backups Automatizados</span>
                </div>
                <div className="trust-item">
                  <i className="fab fa-whatsapp" aria-hidden="true"></i>
                  <span>Atendimento Humano Especializado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Cards dos Planos */}
        <section className="pricing-cards-section">
          <div className="pricing-container">
            {category === 'sites' ? (
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

                    <span className="annual-savings-tag">Sem taxa de adesão surpresa</span>

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
              <h2>Incluso em todos os nossos serviços</h2>
              <p>Não importa o plano escolhido, você conta com tecnologia de ponta e suporte de verdade.</p>
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
                <h2>Precisa de um projeto exclusivo ou tem dúvidas sobre os planos?</h2>
                <p>Nossa equipe analisa suas necessidades e monta uma proposta alinhada ao seu negócio.</p>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de conversar com um especialista sobre um projeto personalizado da Planno.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-contact-button btn-whatsapp-hover"
              >
                Falar com Especialista <i className="fab fa-whatsapp" aria-hidden="true"></i>
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