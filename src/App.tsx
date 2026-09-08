import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CertificationBar } from './components/certification-bar/certification-bar';
import { Oferecimento } from './pages/oferecimento/oferecimento';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <CertificationBar />
        <Oferecimento />
      </main>
      <Footer />
    </>
  );
}

export default App;