import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Twitter, Disc as Discord, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WhitepaperPage from './pages/WhitepaperPage';
import MarkdownPage from './pages/MarkdownPage';

// Web3 Imports
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './web3config';

const queryClient = new QueryClient();

const faqs = [
  {
    question: "$ZEX Token ne zaman piyasaya sürülecek?",
    answer: "$ZEX Ön Satış (Presale) aşaması çok yakında başlayacak. Tüm duyurular ilk olarak Twitter ve Discord kanallarımız üzerinden yapılacaktır. Lansman ve CEX/DEX listelenme tarihleri akıllı kontrat denetimleri tamamlandıktan sonra açıklanacaktır."
  },
  {
    question: "Founder's Edition İnsansı Robot'u nasıl alabilirim?",
    answer: "İlk partide sadece 80 adet üretilen robotlarımızı, cüzdanınızı bağlayarak doğrudan minimum 250.000 $ZEX token karşılığında satın alabilirsiniz. Ayrıca, ön satıştan en az 10.000 $ZEX alarak 20 adetlik çekiliş havuzuna katılma hakkı kazanırsınız. Kargo detayları, token alımından sonra açılacak özel panelden yönetilecektir."
  },
  {
    question: "NFT Üretimi ve Marketplace Entegrasyonu nasıl çalışıyor?",
    answer: "ZexAI platformunda tasarladığınız dijital sanat eserlerini, panelimiz üzerinden tek bir tuşa basarak doğrudan OpenSea ve Zora gibi dev platformlara 'mint' edebilirsiniz (basabilirsiniz). Akıllı kontratlarımız sayesinde gaz ücretleri optimize edilmiştir ve tüm telif hakları size aittir."
  },
  {
    question: "Takım tokenleri neden kilitli?",
    answer: "Biz bu projeyi kısa vadeli kâr için değil, gerçek bir değer ve kalıcı bir ekosistem yaratmak için kurduk. Bu vizyonumuzun bir kanıtı olarak takım ve kurucu tokenleri tam 1 yıl boyunca akıllı kontratlara kilitlenmiştir (Vesting). Buradayız ve geleceği birlikte inşa ediyoruz."
  }
];

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <main>
        <Hero />
      </main>

      {/* FAQ Section */}
      <section className="py-24 px-4 mx-auto max-w-4xl sm:px-6 lg:px-8 relative z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-gray-400">Aklınızdaki soru işaretlerini giderelim.</p>
        </div>

        <div className="space-y-4 relative">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/[0.07]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-white pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050510] py-8 mt-10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/logo192.png" alt="ZexAi" className="w-6 h-6 grayscale opacity-70" />
            <span className="text-gray-500 font-medium">© 2026 ZexAi. Tüm hakları saklıdır.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Şartlar</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Gizlilik</Link>
            <a href="https://twitter.com/zex_ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://discord.gg/zexai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-[#060612] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
            <Navbar />

            {/* Floating Social Media Icons */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
              <a href="https://twitter.com/zex_ai" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:bg-white/10 hover:scale-110 transition-all shadow-lg backdrop-blur-sm group">
                <Twitter className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              </a>
              <a href="https://discord.gg/zexai" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:bg-white/10 hover:scale-110 transition-all shadow-lg backdrop-blur-sm group">
                <Discord className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/whitepaper" element={<WhitepaperPage />} />
              <Route path="/terms" element={<MarkdownPage fileUrl="/ZEX_TERMS_TR.md" title="Hizmet Şartları" />} />
              <Route path="/privacy" element={<MarkdownPage fileUrl="/ZEX_PRIVACY_TR.md" title="Gizlilik Politikası" />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
