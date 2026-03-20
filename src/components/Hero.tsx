import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Trans, useTranslation } from 'react-i18next';
import {
    Sparkles, ArrowRight,
    Palette, Heart, Coins, Shield, Bot, Gift, ShoppingCart, Quote,
    Ruler, Weight, Zap, Cpu, Scan as Radar, CreditCard, Landmark, Wallet, Check
} from 'lucide-react';
import ConnectButton from './ConnectButton';

const TOTAL_SUPPLY = "1.000.000.000";
const ROBOT_MAX_SUPPLY = 80;
const ROBOT_PRICE_ZEX = "250.000";

const Hero: React.FC = () => {
    const { isConnected } = useAccount();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'vision' | 'tokenomics' | 'robot'>('vision');
    const [robotsSold] = useState(12);
    const [paymentMethod, setPaymentMethod] = useState<'web3' | 'cc' | 'bank'>('web3');
    const [activeMedia, setActiveMedia] = useState(0);

    const robotMedia = [
        { type: 'image' as const, src: '/robot-hero.png', alt: 'ZexAI Humanoid Robot - Front View' },
        { type: 'image' as const, src: '/robot-detail.png', alt: 'ZexAI Humanoid Robot - Detail' },
        { type: 'video' as const, src: 'https://www.youtube.com/embed/GzX1qOIO1bE', alt: 'Unitree G1 Demo Video' },
    ];

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
                            <span>{t('hero.visionBadge')}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                            {t('hero.mainTitleLine1')} <br />
                            <span className="text-white">
                                {t('hero.mainTitleLine2')}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#presale"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                            >
                                {t('hero.joinPresale')} <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="https://app.zexai.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
                            >
                                {t('hero.tryApp')} <Palette className="w-5 h-5" />
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
                                { label: t('hero.stats.aiModels'), value: "40+" },
                                { label: t('hero.stats.emotions'), value: "5+" },
                                { label: t('hero.stats.communityShare'), value: "25%" },
                                { label: t('hero.stats.status'), value: t('hero.stats.statusLive') },
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
                    <h2 className="text-3xl md:text-4xl font-black mb-6">{t('story.title')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 text-lg leading-relaxed relative">
                    <div className="space-y-6">
                        <p>
                            <Trans i18nKey="story.p1">
                                Every great innovation starts with an inner spark. While most tech projects are born with profit margins in mind, ZexAI's foundation rests on a much more unshakable power: <strong className="text-white">A father's boundless love and hope for his daughter.</strong>
                            </Trans>
                        </p>
                        <p>
                            {t('story.p2')}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <p>
                            <Trans i18nKey="story.p3">
                                That is exactly the tireless, expectation-free energy from which ZexAI's spirit was born. It is not just a company; it is a <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">colossal art factory that removes the barriers to creativity, hope, and value creation.</strong>
                            </Trans>
                        </p>
                        <p>
                            {t('story.p4')}
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/whitepaper" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-pink-500/30 text-pink-300 hover:bg-pink-500/10 transition-colors font-medium">
                        {t('story.readWhitepaper')} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Campaign Section: Vision, Tokenomics & Physical Robot */}
            <section id="campaign" className="mt-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('campaign.title')}
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('campaign.subtitle')}
                    </p>
                </div>

                <div className="flex justify-center mb-8 flex-wrap gap-2">
                    <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex flex-wrap text-sm">
                        <button
                            onClick={() => setActiveTab('vision')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg transition-all font-medium flex items-center ${activeTab === 'vision' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Palette className="w-4 h-4 mr-2" /> {t('campaign.tabVision')}
                        </button>
                        <button
                            onClick={() => setActiveTab('tokenomics')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg transition-all font-medium flex items-center ${activeTab === 'tokenomics' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Coins className="w-4 h-4 mr-2" /> {t('campaign.tabTokenomics')}
                        </button>
                        <button
                            onClick={() => setActiveTab('robot')}
                            className={`px-4 sm:px-6 py-2.5 rounded-lg transition-all font-medium flex items-center ${activeTab === 'robot' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 text-purple-300 hover:text-purple-200'}`}
                        >
                            <Bot className="w-4 h-4 mr-2" /> {t('campaign.tabRobot')}
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
                                        <img src="/logo192.png" alt="ZexAI" className="w-32 h-32 mb-6 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]" />
                                        <h4 className="text-2xl font-bold mb-2">{t('vision.agentTitle')}</h4>
                                        <p className="text-gray-400">
                                            {t('vision.agentDesc')}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400 mb-4">
                                        {t('vision.mintBadge')}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">{t('vision.mintTitle')}</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        {t('vision.mintDesc')}
                                    </p>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                        <h4 className="text-lg font-semibold mb-4 text-white">{t('vision.whyWinTitle')}</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-center text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                                                {t('vision.whyWin1')}
                                            </li>
                                            <li className="flex items-center text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                                                {t('vision.whyWin2')}
                                            </li>
                                            <li className="flex items-center text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" />
                                                {t('vision.whyWin3')}
                                            </li>
                                        </ul>
                                    </div>

                                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2">
                                        <Palette className="w-5 h-5" /> {t('vision.startCreating')}
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
                                        {t('tokenomics.supplyBadge')}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">{t('tokenomics.title')}</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {t('tokenomics.desc')}
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {(t('tokenomics.tiers', { returnObjects: true }) as any[]).map((item, idx) => (
                                            <li key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 border-l-4 border-l-cyan-500">
                                                <span className="font-semibold text-white">{item.name}</span>
                                                <span className="text-gray-400 text-sm hidden sm:inline-block">{item.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-[#050510] border border-white/10 rounded-2xl p-8 text-center relative">
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
                                    <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                                    <h4 className="text-2xl font-bold mb-2">{t('tokenomics.utilityTitle')}</h4>
                                    <p className="text-gray-400 mb-8 text-sm">
                                        {t('tokenomics.utilityDesc')}
                                    </p>
                                    <div className="space-y-3 mb-8 text-left">
                                        <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300">
                                            🔥 <span className="text-white font-semibold">{t('tokenomics.burnTitle')}</span>{t('tokenomics.burnDesc')}
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300">
                                            💰 <span className="text-white font-semibold">{t('tokenomics.yieldTitle')}</span>{t('tokenomics.yieldDesc')}
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-full mt-8">
                                        <ConnectButton />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'robot' && (
                            <motion.div
                                key="robot"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                            >
                                {/* Left Column: Robot Visual & Specs */}
                                <div className="lg:col-span-5 space-y-4">
                                    {/* Main Media Display */}
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                        <div className="relative aspect-[4/3] bg-[#050510] rounded-3xl border border-white/10 overflow-hidden">
                                            {robotMedia[activeMedia].type === 'image' ? (
                                                <img
                                                    src={robotMedia[activeMedia].src}
                                                    alt={robotMedia[activeMedia].alt}
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <iframe
                                                    src={robotMedia[activeMedia].src}
                                                    title={robotMedia[activeMedia].alt}
                                                    className="w-full h-full"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            )}
                                            <div className="absolute top-4 left-4 bg-purple-500/20 border border-purple-500/50 text-purple-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider backdrop-blur-md flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" /> {t('robot.badgeLimited')}
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                                {t('robot.badgeAi')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnail Strip */}
                                    <div className="flex gap-2">
                                        {robotMedia.map((media, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveMedia(i)}
                                                className={`relative flex-1 aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                                                    activeMedia === i
                                                        ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                                        : 'border-white/10 opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                {media.type === 'image' ? (
                                                    <img src={media.src} alt={media.alt} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-[#050510] flex items-center justify-center">
                                                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tech Specs Grid */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <Radar className="w-4 h-4 text-cyan-400" />
                                            {t('robot.specsTitle')}
                                        </h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { icon: <Ruler className="w-4 h-4" />, text: t('robot.specs.height') },
                                                { icon: <Weight className="w-4 h-4" />, text: t('robot.specs.weight') },
                                                { icon: <Zap className="w-4 h-4" />, text: t('robot.specs.speed') },
                                                { icon: <Bot className="w-4 h-4" />, text: t('robot.specs.dof') },
                                                { icon: <Zap className="w-4 h-4" />, text: t('robot.specs.battery') },
                                                { icon: <Cpu className="w-4 h-4" />, text: t('robot.specs.compute') },
                                                { icon: <Radar className="w-4 h-4" />, text: t('robot.specs.sensors') },
                                            ].map((spec, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-gray-400 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                                    <span className="text-cyan-400">{spec.icon}</span>
                                                    {spec.text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Purchase Form */}
                                <div className="lg:col-span-7 space-y-6">
                                    <div>
                                        <h3 className="text-4xl font-black mb-4">{t('robot.title')}</h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                                            <Trans i18nKey="robot.desc">
                                                Transcend the limits of software! Own a custom-built Humanoid Robot, 100% integrated into the ZexAI ecosystem. The first batch is strictly limited to <strong className="text-white">only 80 units</strong> and will never be produced again.
                                            </Trans>
                                        </p>
                                    </div>

                                    <div className="bg-[#0D0D2B] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                        {/* Status Header */}
                                        <div className="p-6 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-b border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingCart className="w-6 h-6 text-purple-400" />
                                                    <h4 className="text-xl font-bold text-white">{t('robot.buyTitle')}</h4>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                                        {ROBOT_PRICE_ZEX} ZEX
                                                    </div>
                                                    <div className="text-xs text-gray-400">≈ $12,500 USD</div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-2">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(robotsSold / ROBOT_MAX_SUPPLY) * 100}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-full rounded-full"
                                                />
                                            </div>
                                            <div className="flex justify-between items-center text-xs font-bold mt-1">
                                                <span className="text-gray-400">{robotsSold} / {ROBOT_MAX_SUPPLY} {t('robot.badgeLimited').toUpperCase()}</span>
                                                <span className="text-cyan-400 animate-pulse">{t('robot.buyLeft', { count: ROBOT_MAX_SUPPLY - robotsSold })}</span>
                                            </div>
                                        </div>

                                        {/* Payment Selection */}
                                        <div className="p-6 space-y-4">
                                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('robot.paymentMethods')}</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {[
                                                    { id: 'web3', icon: <Wallet className="w-5 h-5" />, label: t('robot.payWeb3') },
                                                    { id: 'cc', icon: <CreditCard className="w-5 h-5" />, label: t('robot.payCC') },
                                                    { id: 'bank', icon: <Landmark className="w-5 h-5" />, label: t('robot.payBank') },
                                                ].map((method) => (
                                                    <button
                                                        key={method.id}
                                                        onClick={() => setPaymentMethod(method.id as any)}
                                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${paymentMethod === method.id
                                                            ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {method.icon}
                                                        <span className="text-xs font-semibold text-center">{method.label}</span>
                                                        {paymentMethod === method.id && <Check className="w-3 h-3 absolute top-2 right-2 text-purple-400" />}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Dynamic Form based on Payment Method */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={paymentMethod}
                                                className="mt-6"
                                            >
                                                {paymentMethod === 'web3' && (
                                                    <div className="text-center">
                                                        {isConnected ? (
                                                            <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]">
                                                                <ShoppingCart className="w-5 h-5" /> {t('robot.confirmPurchase')}
                                                            </button>
                                                        ) : (
                                                            <div className="flex justify-center w-full">
                                                                <ConnectButton />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {paymentMethod === 'cc' && (
                                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                                                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto opacity-50" />
                                                        <p className="text-sm text-gray-400">
                                                            {t('robot.payCCDesc', { defaultValue: "Safely process your payment via Stripe secure infrastructure. All major cards accepted." })}
                                                        </p>
                                                        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg transition-all hover:scale-[1.02]">
                                                            {t('robot.payCCBtn', { defaultValue: "Proceed to Checkout" })}
                                                        </button>
                                                    </div>
                                                )}

                                                {paymentMethod === 'bank' && (
                                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                                                        <Landmark className="w-12 h-12 text-gray-400 mx-auto opacity-50" />
                                                        <p className="text-sm text-gray-400">
                                                            {t('robot.payBankDesc', { defaultValue: "Contact our sales team for Bank Transfer or Swift instructions. Minimum order amount applies for bank transfers." })}
                                                        </p>
                                                        <a href="mailto:sales@zexai.io" className="block w-full py-4 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-lg transition-all hover:bg-white/20">
                                                            {t('robot.payBankBtn', { defaultValue: "Contact Sales" })}
                                                        </a>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Viral Raffle Section */}
                                    <div className="bg-gradient-to-br from-pink-600/10 to-purple-600/10 border border-pink-500/20 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6">
                                        <div className="bg-pink-500/20 p-4 rounded-2xl">
                                            <Gift className="w-10 h-10 text-pink-400" />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 className="text-lg font-bold text-white mb-1">{t('robot.raffleTitle')}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                <Trans i18nKey="robot.raffleDesc">
                                                    Earn your raffle ticket by purchasing <strong className="text-white">at least 10,000 ZEX</strong> during the presale.
                                                </Trans>
                                            </p>
                                        </div>
                                        <button className="whitespace-nowrap px-6 py-3 rounded-xl border border-pink-500/50 hover:bg-pink-500/10 text-pink-300 font-bold text-sm transition-all opacity-70 cursor-not-allowed">
                                            {t('robot.raffleBtn')}
                                        </button>
                                    </div>
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
