import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CertificationBar } from './components/certification-bar/certification-bar';
import { Oferecimento } from './pages/oferecimento/oferecimento';
import { Footer } from './components/footer/footer';
import StoreDetails from './pages/store-datails/store-details';
import ComoFunciona from './pages/como-funciona/como-funciona';

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
      </main>
      <Footer />
    </>
  );
}

export default App;