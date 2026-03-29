import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';
import { Twitter, Disc as Discord, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WhitepaperPage from './pages/WhitepaperPage';
import MarkdownPage from './pages/MarkdownPage';
import DocsPage from './pages/DocsPage';
import { GrokAssistant } from './components/GrokAssistant';
import TickerBar from './components/TickerBar';
import ParticleNetwork from './components/ParticleNetwork';
import Roadmap from './components/Roadmap';
import TeamSection from './components/TeamSection';
import StakingCalculator from './components/StakingCalculator';
import NFTGallery from './components/NFTGallery';

// Web3 Imports
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './web3config';

const queryClient = new QueryClient();

function Home() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q9'), answer: t('faq.a9') },
    { question: t('faq.q10'), answer: t('faq.a10') }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <main>
        <Hero />
        <NFTGallery />
      </main>

      {/* FAQ Section */}
      <section className="py-24 px-4 mx-auto max-w-4xl sm:px-6 lg:px-8 relative z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-black mb-4">{t('faq.title')}</h2>
          <p className="text-gray-400">{t('faq.subtitle')}</p>
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

      <Roadmap />
      <StakingCalculator />
      <TeamSection />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050510] py-8 mt-10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/logo192.png" alt="ZexAi" className="w-6 h-6 grayscale opacity-70" />
            <span className="text-gray-500 font-medium">{t('footer.copyright')}</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <a href="https://x.com/ZexAi_io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://discord.gg/zexai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen text-white selection:bg-teal-500/30 overflow-hidden font-sans relative pt-8">
              <TickerBar />
              <ParticleNetwork />
              <div className="premium-bg" />
              <GrokAssistant />
              <Navbar />

              {/* Floating Social Media Icons */}
              <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                <a href="https://x.com/ZexAi_io" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:bg-white/10 hover:scale-110 transition-all shadow-lg backdrop-blur-sm group">
                  <Twitter className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                </a>
                <a href="https://discord.gg/zexai" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:bg-white/10 hover:scale-110 transition-all shadow-lg backdrop-blur-sm group">
                  <Discord className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
              </div>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/whitepaper" element={<WhitepaperPage />} />
                <Route path="/terms" element={<MarkdownPage fileUrlTemplate="/ZEX_TERMS_{LANG}.md" titleKey="markdown.termsTitle" />} />
                <Route path="/privacy" element={<MarkdownPage fileUrlTemplate="/ZEX_PRIVACY_{LANG}.md" titleKey="markdown.privacyTitle" />} />
              </Routes>
            </div>
          </Router>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
}

export default App;
