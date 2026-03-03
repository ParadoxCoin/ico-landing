import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ShoppingCart, Gift, ArrowRight, Shield, Star, Zap } from 'lucide-react';

const ROBOT_MAX_SUPPLY = 80;
const ROBOT_PRICE_ZEX = "50,000";

const RobotStore: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ico' | 'store'>('store');
    const [robotsSold] = useState(12);

    return (
        <section id="store" className="py-24 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-4 backdrop-blur-sm">
                    💎 Founder's Edition
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    ZexAi Humanoid Robots
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Exclusive Humanoid Robots for early adopters. Buy directly from the store or win one through the ZEX Token Presale giveaway.
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <div className="bg-white/5 border border-white/10 p-1 rounded-xl inline-flex text-sm backdrop-blur-md">
                    <button
                        onClick={() => setActiveTab('store')}
                        className={`px-6 py-3 rounded-lg transition-all font-bold flex items-center gap-2 ${activeTab === 'store' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        <ShoppingCart className="w-4 h-4" /> Robot Store
                    </button>
                    <button
                        onClick={() => setActiveTab('ico')}
                        className={`px-6 py-3 rounded-lg transition-all font-bold flex items-center gap-2 ${activeTab === 'ico' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Gift className="w-4 h-4" /> ICO & Giveaway
                    </button>
                </div>
            </div>

            <div className="bg-dark border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <AnimatePresence mode="wait">
                    {activeTab === 'store' ? (
                        <motion.div
                            key="store"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Robot Visual */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative aspect-square bg-[#050510] rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden">
                                    <Bot className="w-48 h-48 text-primary/50 mb-8 animate-pulse" />
                                    <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 text-red-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                        Strictly Limited
                                    </div>
                                    <h4 className="text-xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">ZexAi Core v1</h4>
                                </div>
                            </div>

                            {/* Store Details */}
                            <div>
                                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400 mb-4">
                                    UNIT {robotsSold + 1} / {ROBOT_MAX_SUPPLY}
                                </div>
                                <h3 className="text-3xl font-bold mb-4">ZexAi Humanoid Prototype v1</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Secure a piece of history. Only 80 units of the Founder's Edition Humanoid Robot will ever be produced. Fully integrated with the ZexAi ecosystem, featuring autonomous learning and Web3 wallet capabilities.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                        <div>
                                            <div className="font-bold text-sm">Autonomous AI</div>
                                            <div className="text-xs text-gray-400">Powered by ZexAi Core</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <div>
                                            <div className="font-bold text-sm">Web3 Native</div>
                                            <div className="text-xs text-gray-400">Built-in Hardware Wallet</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                    <div className="flex items-end justify-between mb-2">
                                        <span className="text-gray-400">Fixed Cost:</span>
                                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                                            {ROBOT_PRICE_ZEX} ZEX
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-2 mt-4 overflow-hidden relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(robotsSold / ROBOT_MAX_SUPPLY) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="bg-gradient-to-r from-cyan-500 to-primary h-full rounded-full"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-right">{ROBOT_MAX_SUPPLY - robotsSold} units remaining</p>
                                </div>

                                <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-5 h-5" /> Buy with Wallet
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="ico"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Event Details */}
                            <div>
                                <h3 className="text-3xl font-bold mb-4">Buy ZEX, Win a Robot</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Purchase ZEX tokens during the Presale phase and automatically earn tickets for the Humanoid Robot Giveaway.
                                </p>

                                <div className="space-y-3 mb-8">
                                    {[
                                        { tier: "Tier 1: 1,000 ZEX", tickets: "1 Ticket", bonus: "" },
                                        { tier: "Tier 2: 5,000 ZEX", tickets: "10 Tickets", bonus: "2x Bonus" },
                                        { tier: "Tier 3: 10,000 ZEX", tickets: "25 Tickets", bonus: "2.5x Bonus" },
                                        { tier: "Tier 4: 50,000 ZEX", tickets: "Guaranteed Robot", bonus: "Limited!" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                                            <span className="font-semibold">{item.tier}</span>
                                            <div className="text-right">
                                                <div className="text-cyan-400 font-bold">{item.tickets}</div>
                                                {item.bonus && <div className="text-xs text-primary">{item.bonus}</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Box */}
                            <div className="bg-[#050510] border border-white/10 rounded-2xl p-8 text-center relative shadow-xl overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-cyan-500"></div>
                                <Gift className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                                <h4 className="text-2xl font-bold mb-2">Connect to Participate</h4>
                                <p className="text-gray-400 mb-8 text-sm px-4">
                                    Connect your wallet on the EVM network to participate in the presale and secure your giveaway entries instantly.
                                </p>
                                <button className="mx-auto w-full max-w-xs py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                                    Connect Web3 Wallet
                                </button>
                                <p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1">
                                    <Shield className="w-3 h-3" /> Secure smart contract
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default RobotStore;
