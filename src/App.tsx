import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;