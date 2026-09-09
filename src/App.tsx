import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { ScrollRevealObserver } from './hook/use-scroll-reveal';

import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CertificationBar } from './components/certification-bar/certification-bar';
import { Oferecimento } from './pages/oferecimento/oferecimento';
import StoreDetails from './pages/store-datails/store-details';
import ComoFunciona from './pages/como-funciona/como-funciona';
import Equipe from './pages/equipe/equipe';
import Planos from './pages/planos/planos';
import Faq from './pages/faq/faq';
import Contato from './pages/contato/contato';
import { Footer } from './components/footer/footer';

import PlanosPage from './pages/planos-page/planos-page';
import TermosDeUso from './pages/termos-de-uso-page/termos-de-uso-page';
import PoliticaPrivacidade from './pages/pdp-page/pdp-page';

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <CertificationBar />
        <Oferecimento />
        <StoreDetails />
        <ComoFunciona />
        <Equipe />
        <Planos />
        <Faq />
        <Contato />
      </main>
      <Footer />
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
        <Route path="/planos" element={<PlanosPage />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="/politicas-de-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;