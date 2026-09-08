import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CertificationBar } from './components/certification-bar/certification-bar';
import { Oferecimento } from './pages/oferecimento/oferecimento';
import { Footer } from './components/footer/footer';
import StoreDetails from './pages/store-datails/store-details';
import ComoFunciona from './pages/como-funciona/como-funciona';
import Equipe from './pages/equipe/equipe';
import Faq from './pages/faq/faq';
import Contato from './pages/contato/contato';
import Planos from './pages/planos/planos';

function App() {
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
}

export default App;