import React from 'react';
import { SuperadminRedirect } from './pages/superadmin/superadmin-redirect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { ScrollRevealObserver } from './hook/use-scroll-reveal';

import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { Apresentacao } from './pages/apresentacao/apresentacao';
import { Oferecimento } from './pages/oferecimento/oferecimento';
import StoreDetails from './pages/store-datails/store-details';
import ProblemasSolucoes from './pages/problemas-solucoes/problemas-solucoes';
import Diferenciais from './pages/diferenciais/diferenciais';
import ComoFunciona from './pages/como-funciona/como-funciona';
import Projetos from './pages/projetos/projetos';
import Planos from './pages/planos/planos';
import Faq from './pages/faq/faq';
import Contato from './pages/contato/contato';
import Conversao from './pages/conversao/conversao';
import SecaoPage from './pages/secao-page/secao-page';
import { Footer } from './components/footer/footer';
import { WhatsAppFloat } from './components/whatsapp-float/whatsapp-float';
import { usePageMeta } from './hook/use-page-meta';

import PlanosPage from './pages/planos-page/planos-page';
import TermosDeUso from './pages/termos-de-uso-page/termos-de-uso-page';
import PoliticaPrivacidade from './pages/pdp-page/pdp-page';

const SITE_TITLE = 'Planno | Sites, landing pages e lojas virtuais';
const SITE_DESCRIPTION =
  'Criamos sites modernos, estratégicos e personalizados para transformar sua presença digital em novas oportunidades de negócio. Landing pages, sites institucionais e a Planno Store.';

const LandingPage: React.FC = () => {
  usePageMeta(
    SITE_TITLE,
    SITE_DESCRIPTION
  );
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Home />
        <Apresentacao />
        <Oferecimento />
        <StoreDetails />
        <ProblemasSolucoes />
        <Diferenciais />
        <ComoFunciona />
        <Planos />
        <Conversao />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <ScrollRevealObserver />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/superadmin/*" element={<SuperadminRedirect />} />
        <Route path="/planos" element={<PlanosPage />} />
        <Route
          path="/projetos"
          element={
            <SecaoPage
              title="Projetos | Planno"
              description="Sites, landing pages e projetos que a Planno já entregou, no ar e funcionando."
            >
              <Projetos />
            </SecaoPage>
          }
        />
        <Route
          path="/faq"
          element={
            <SecaoPage
              title="Perguntas frequentes | Planno"
              description="Dúvidas sobre sites, landing pages, Planno Store, pagamentos por Pix e cartão, domínio e suporte."
            >
              <Faq />
            </SecaoPage>
          }
        />
        <Route
          path="/contato"
          element={
            <SecaoPage
              title="Contato | Planno"
              description="Vamos conversar sobre seu projeto: site profissional, landing page ou loja virtual completa."
            >
              <Contato />
            </SecaoPage>
          }
        />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="/politicas-de-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;