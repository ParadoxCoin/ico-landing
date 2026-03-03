import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import {
    Sparkles, ArrowRight,
    Palette, Heart, Coins, Shield, Bot, Gift, ShoppingCart, Quote
} from 'lucide-react';

const TOTAL_SUPPLY = "1.000.000.000";
const ROBOT_MAX_SUPPLY = 80;
const ROBOT_PRICE_ZEX = "250.000";

const Hero: React.FC = () => {
    const { isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState<'vision' | 'tokenomics' | 'robot'>('vision');
    const [robotsSold] = useState(12);

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[#060612]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[150px]" />
                    <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] animate-pulse" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-pink-500/30 text-pink-300 text-sm font-medium mb-8">
                            <Heart className="w-4 h-4 text-pink-400" />
                            <span>Bir Babanın Vizyonu, Dünyanın Tuvali</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                            Yapay Zeka ve Web3 Sanatının <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                                Yeni Evrimi
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            40'tan fazla elit yapay zeka modeliyle duygularınızı dijital başyapıtlara dönüştürün. Tek tıkla OpenSea ve Zora'da NFT olarak basın. Sadece kâr için değil, yaratıcılığın sınırsız geleceği için inşa edildi.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#presale"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                            >
                                Ön Satışa Katıl <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="https://app.zexai.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
                            >
                                Uygulamayı Dene <Palette className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Platform Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-20 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8"
                    >
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { label: "Yapay Zeka Modeli", value: "40+" },
                                { label: "Yakalanan Duygu", value: "∞" },
                                { label: "Topluluk Payı", value: "25%" },
                                { label: "Platform Durumu", value: "Yayında" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-purple-300 uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Story / Whitepaper Narrative Section */}
            <section className="py-24 px-4 mx-auto max-w-6xl sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-pink-500/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative text-center mb-16">
                    <Quote className="w-12 h-12 text-pink-500/50 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Sevgiyle Kodlanan Bir Gelecek</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 text-lg leading-relaxed relative">
                    <div className="space-y-6">
                        <p>
                            Her büyük yenilik içsel bir kıvılcımla başlar. Çoğu teknoloji projesi kâr marjlarıyla doğarken, ZexAI’nin temeli çok daha sarsılmaz bir güce dayanır: <strong className="text-white">Bir babanın kızı için beslediği sınırsız sevgi ve umut.</strong>
                        </p>
                        <p>
                            Kızı hasta olan bir babanın günlerce uyumamasını bilir misiniz? O yorgun beden zihninin yorulmasına asla izin vermez. Çünkü o bekleyiş bir ödül için değil, sadece o masum canın sağlığına kavuşması içindir.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <p>
                            İşte ZexAI’nin ruhu tam da bu yorulmak bilmez, beklentisiz enerjiden doğmuştur. Sadece bir şirket değil; <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">yaratıcılığın, umudun ve değer üretmenin önündeki engelleri kaldıran</strong> devasa bir sanat fabrikasıdır.
                        </p>
                        <p>
                            Biz bu platformu, bir babanın çocuğuna sunduğu o güvenli oyun alanını tüm dünyaya sunmak, hayal etmekten vazgeçmeyen milyonları Web3 ekonomisine dahil etmek için "Yapay Zeka ve NFT" odaklı tasarladık.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/whitepaper" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-pink-500/30 text-pink-300 hover:bg-pink-500/10 transition-colors font-medium">
                        Whitepaper'ın Tamamını Oku <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Campaign Section: Vision, Tokenomics & Physical Robot */}
            <section id="campaign" className="mt-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        ZexAI Ekosistemi ve Fırsatlar
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Şeffaflık, sevgi ve vizyoner bir fayda üzerine inşa edilmiş merkeziyetsiz bir platform. Üret, NFT'ye dönüştür, kazan ve fiziksel geleceğin bir parçası ol.
                    </p>
                </div>

                <div className="flex justify-center mb-8 flex-wrap gap-2">
                    <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex flex-wrap text-sm">
                        <button
                            onClick={() => setActiveTab('vision')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg transition-all font-medium flex items-center ${activeTab === 'vision' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Palette className="w-4 h-4 mr-2" /> NFT Ekosistemi
                        </button>
                        <button
                            onClick={() => setActiveTab('tokenomics')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg transition-all font-medium flex items-center ${activeTab === 'tokenomics' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Coins className="w-4 h-4 mr-2" /> $ZEX Ekonomisi
                        </button>
                        <button
                            onClick={() => setActiveTab('robot')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg transition-all font-medium flex items-center ${activeTab === 'robot' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 text-purple-300 hover:text-purple-200'}`}
                        >
                            <Bot className="w-4 h-4 mr-2" /> Founder's Edition Robot 🚀
                        </button>
                    </div>
                </div>

                <div className="bg-[#0A0A1F] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                    {/* Background Effects inside Card */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

                    <AnimatePresence mode="wait">
                        {activeTab === 'vision' && (
                            <motion.div
                                key="vision"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                    <div className="relative aspect-square bg-[#050510] rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden p-8 text-center">
                                        <Sparkles className="w-32 h-32 text-pink-400/50 mb-6" />
                                        <h4 className="text-2xl font-bold mb-2">Synapse AI Ajanı</h4>
                                        <p className="text-gray-400">
                                            Sadece "Umut" yazın, Synapse Ajanı nefes kesici bir sanat eseri için mükemmel komutu (prompt) hazırlasın. Mühendisliğe gerek yok.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400 mb-4">
                                        KUSURSUZ ENTEGRASYON
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Doğrudan OpenSea ve Zora'ya Mintle</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        ZexAI, saniyeler içinde küresel çapta tanınan bir sanatçı olmanızı sağlar. Yapay zeka ile görsel veya video üretin ve tek tıkla dünyanın en büyük pazarlarında NFT olarak basın.
                                    </p>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                        <h4 className="text-lg font-semibold mb-4 text-white">Neden ZexAI Üreticileri Kazanıyor:</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-center text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                                                Tüm üretimler için telifsiz tam ticari haklar
                                            </li>
                                            <li className="flex items-center text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                                                Panel üzerinden doğrudan optimize edilmiş (gas-optimized) mintleme
                                            </li>
                                            <li className="flex items-center text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                                                $ZEX tokenleri ile desteklenen komisyon indirimleri
                                            </li>
                                        </ul>
                                    </div>

                                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2">
                                        <Palette className="w-5 h-5" /> Üretmeye ve Mintlemeye Başla
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'tokenomics' && (
                            <motion.div
                                key="tokenomics"
                                id="presale"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                <div>
                                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400 mb-4">
                                        TOPLAM ARZ: {TOTAL_SUPPLY}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">$ZEX Dağıtım Planı</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        Adil, uzun vadeli ve topluluk odaklı bir dağıtım modeli. Kısa vadeli spekülasyonlar için değil, sürdürülebilirlik için inşa edildi. Takım tokenleri 1 yıl tam kilitlidir.
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {[
                                            { tier: "%35 - Ön Satış / ICO", desc: "Topluluk Fazı 1" },
                                            { tier: "%25 - Ekosistem & Staking", desc: "Kullanıcılar ve Üreticiler İçin Ödüller" },
                                            { tier: "%15 - Merkezi / Merkeziyetsiz Borsa Likiditesi", desc: "İstikrar için kilitli" },
                                            { tier: "%10 - Pazarlama & Partnerlikler", desc: "OpenSea, Zora, Küresel Büyüme" },
                                            { tier: "%10 - Takım ve Kurucular", desc: "1 Yıl Tam Kilit (Biz buradayız, gitmiyoruz)" },
                                            { tier: "%5 - Danışmanlar", desc: "6 Ay Kilitli" }
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 border-l-4 border-l-cyan-500">
                                                <span className="font-semibold text-white">{item.tier}</span>
                                                <span className="text-gray-400 text-sm hidden sm:inline-block">{item.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-[#050510] border border-white/10 rounded-2xl p-8 text-center relative">
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
                                    <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                                    <h4 className="text-2xl font-bold mb-2">$ZEX Faydaları İstikrarı</h4>
                                    <p className="text-gray-400 mb-8 text-sm">
                                        Token sahipleri platform gelir paylaşımından (Revenue Share) pasif gelir elde eder, üretim indirimlerinden faydalanır ve periyodik "Geri Alım & Yakım" etkinliklerine katılır.
                                    </p>
                                    <div className="space-y-3 mb-8 text-left">
                                        <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300">
                                            🔥 <span className="text-white font-semibold">Deflasyonist (Yakım)</span>: Ekosistem gelirleriyle piyasadan $ZEX alınır ve yakılır.
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300">
                                            💰 <span className="text-white font-semibold">Gerçek Gelir (Real Yield)</span>: Staking yapanlar, abonelik ve üretim gelirlerinden pay alır.
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-full mt-8">
                                        <w3m-button />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'robot' && (
                            <motion.div
                                key="robot"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                    <div className="relative aspect-square bg-[#050510] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                                        <Bot className="w-48 h-48 text-purple-400/50 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 left-4 bg-purple-500/20 border border-purple-500/50 text-purple-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider backdrop-blur-md flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" /> Sınırlı Üretim
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                            Yapay Zeka Entegreli
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold mb-4">ZexAI İnsansı Robot (Founder's Edition)</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        Yazılım sınırlarını aşın! ZexAI ekosistemine %100 entegre, özel üretim İnsansı Robot'a sahip olun. İlk parti <strong>yalnızca 80 adet</strong> ile sınırlandırılmıştır ve bir daha üretilmeyecektir.
                                    </p>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
                                        {/* Satış Kısmı */}
                                        <div className="p-6 border-b border-white/5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <ShoppingCart className="w-5 h-5 text-purple-400" />
                                                <h4 className="text-lg font-bold text-white">Doğrudan Satın Al (80 Adet)</h4>
                                            </div>
                                            <div className="flex items-end justify-between mb-2">
                                                <span className="text-gray-400 text-sm">Fiyat (Cüzdan İle)</span>
                                                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                                    {ROBOT_PRICE_ZEX} ZEX
                                                </span>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full"
                                                    style={{ width: `${(robotsSold / ROBOT_MAX_SUPPLY) * 100}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-cyan-400 mt-2 text-right">Sadece {ROBOT_MAX_SUPPLY - robotsSold} adet kaldı!</p>
                                        </div>

                                        <div className="p-6 bg-purple-900/10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Gift className="w-5 h-5 text-pink-400" />
                                                <h4 className="text-lg font-bold text-white">Büyük ICO Çekilişi (20 Adet)</h4>
                                            </div>
                                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                                Ön satışta <strong className="text-white">en az 10.000 ZEX</strong> alarak çekiliş biletinizi kazanın. Viral kampanyamızda bedava İnsansı Robot şansını yakalayın!
                                            </p>
                                            <button className="w-full py-3 rounded-xl border border-pink-500/50 hover:bg-pink-500/10 text-pink-300 font-bold text-sm transition-colors cursor-not-allowed opacity-70">
                                                🎯 Çekilişe Katıl (Yakında)
                                            </button>
                                        </div>
                                    </div>

                                    {isConnected ? (
                                        <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                            <ShoppingCart className="w-5 h-5" /> Satın Alımı Onayla
                                        </button>
                                    ) : (
                                        <div className="flex justify-center w-full">
                                            <w3m-button />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
};

export default Hero;
