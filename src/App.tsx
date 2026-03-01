import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        {/* Placeholder for other sections */}
        <section id="about" className="h-screen flex items-center justify-center bg-dark-lighter">
          <h2 className="text-4xl font-bold text-gray-700">About Section Placeholder</h2>
        </section>
        <section id="features" className="h-screen flex items-center justify-center bg-dark">
          <h2 className="text-4xl font-bold text-gray-700">Features Section Placeholder</h2>
        </section>
        <section id="tokenomics" className="h-screen flex items-center justify-center bg-dark-lighter">
          <h2 className="text-4xl font-bold text-gray-700">Tokenomics Section Placeholder</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
