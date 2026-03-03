import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot, Sparkles, ArrowRight, Download,
    ShoppingCart, Gift
} from 'lucide-react';

const ROBOT_MAX_SUPPLY = 80;
const ROBOT_PRICE_ZEX = "50,000";

const Hero: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ico' | 'store'>('ico');
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span>ZEX Token Presale is Live</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                            The Next Evolution of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                                AI & Web3 Innovation
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            ZexAi combines 40+ elite AI models with decentralized infrastructure. Generate world-class media, stake tokens, and shape the future of artificial intelligence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#presale"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                            >
                                Join Presale <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="/whitepaper"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
                            >
                                Read Whitepaper <Download className="w-5 h-5" />
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
                                { label: "Active Models", value: "40+" },
                                { label: "Generations / Min", value: "1,200+" },
                                { label: "ZEX Staked", value: "$4.2M" },
                                { label: "Global Users", value: "85K+" },
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

            {/* Campaign Section: Store & Giveaway */}
            <section id="campaign" className="mt-32 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        ZexAi Founder's Edition
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Exclusive Humanoid Robots for early adopters. Buy directly from the store or win one through the ZEX Token Presale giveaway.
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="bg-white/5 border border-white/10 p-1 rounded-xl inline-flex text-sm">
                        <button
                            onClick={() => setActiveTab('store')}
                            className={`px-6 py-2.5 rounded-lg transition-all font-medium ${activeTab === 'store' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <ShoppingCart className="w-4 h-4 inline-block mr-2" /> Robot Store
                        </button>
                        <button
                            onClick={() => setActiveTab('ico')}
                            className={`px-6 py-2.5 rounded-lg transition-all font-medium ${activeTab === 'ico' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Gift className="w-4 h-4 inline-block mr-2" /> ICO & Giveaway
                        </button>
                    </div>
                </div>

                <div className="bg-[#0A0A1F] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                    {/* Background Effects inside Card */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

                    <AnimatePresence mode="wait">
                        {activeTab === 'store' ? (
                            <motion.div
                                key="store"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                    <div className="relative aspect-square bg-[#050510] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                                        <Bot className="w-48 h-48 text-purple-400/50" />
                                        <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 text-red-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                            Strictly Limited
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400 mb-4">
                                        UNIT {robotsSold + 1} / {ROBOT_MAX_SUPPLY}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">ZexAi Humanoid Prototype v1</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        Secure a piece of history. Only 80 units of the Founder's Edition Humanoid Robot will ever be produced. Fully integrated with the ZexAi ecosystem, featuring autonomous learning and Web3 wallet capabilities.
                                    </p>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                        <div className="flex items-end justify-between mb-2">
                                            <span className="text-gray-400">Fixed Price</span>
                                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                                {ROBOT_PRICE_ZEX} ZEX
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2 mt-4 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full"
                                                style={{ width: `${(robotsSold / ROBOT_MAX_SUPPLY) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 text-right">{ROBOT_MAX_SUPPLY - robotsSold} units remaining</p>
                                    </div>

                                    <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-5 h-5" /> Buy Robot with Web3 Wallet
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="ico"
                                id="presale"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                <div>
                                    <h3 className="text-3xl font-bold mb-4">ZEX Token Presale</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        Purchase ZEX tokens during the Presale phase and automatically earn tickets for the Humanoid Robot Giveaway.
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {[
                                            { tier: "Tier 1: 1,000 ZEX", tickets: "1 Ticket" },
                                            { tier: "Tier 2: 5,000 ZEX", tickets: "10 Tickets (2x Bonus)" },
                                            { tier: "Tier 3: 10,000 ZEX", tickets: "25 Tickets (2.5x Bonus)" },
                                            { tier: "Tier 4: 50,000 ZEX", tickets: "Guaranteed Robot OR 150 Tickets" }
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                                <span className="font-semibold">{item.tier}</span>
                                                <span className="text-cyan-400 font-bold">{item.tickets}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-[#050510] border border-white/10 rounded-2xl p-8 text-center relative">
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
                                    <Gift className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                                    <h4 className="text-2xl font-bold mb-2">Connect to Participate</h4>
                                    <p className="text-gray-400 mb-8 text-sm">
                                        Connect your Ethereum wallet to participate in the presale and secure your giveaway entries instantly.
                                    </p>
                                    <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 mx-auto">
                                        🔗 Connect Wallet
                                    </button>
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
