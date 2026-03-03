import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-[#060612] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#03030A] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo192.png" alt="ZexAi" className="w-6 h-6 grayscale opacity-70" />
            <span className="text-gray-500 font-medium">© 2026 ZexAi. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/whitepaper" className="hover:text-white transition-colors">Whitepaper</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
