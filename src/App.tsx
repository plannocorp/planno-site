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
import { Footer } from './components/footer/footer';
import { WhatsAppFloat } from './components/whatsapp-float/whatsapp-float';
import { usePageMeta } from './hook/use-page-meta';

import PlanosPage from './pages/planos-page/planos-page';
import TermosDeUso from './pages/termos-de-uso-page/termos-de-uso-page';
import PoliticaPrivacidade from './pages/pdp-page/pdp-page';

const LandingPage: React.FC = () => {
  usePageMeta(
    'Planno | Landing pages, sites institucionais e lojas virtuais',
    'A Planno cria landing pages e sites institucionais sob medida e lojas virtuais com a Planno Store (a partir de R$ 129,90/mês), com hospedagem e manutenção.'
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
        <Projetos />
        <Faq />
        <Contato />
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
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="/politicas-de-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;