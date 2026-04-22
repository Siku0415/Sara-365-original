/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Clock, 
  PlayCircle, 
  HelpCircle, 
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Configuration
const DOWNLOAD_LINK = "https://sara365.xyz/sara365.apk";
const PRIMARY_COLOR = "#EAB308"; // Professional Yellow for Sara 365
const ACCENT_COLOR = "#111827"; // Dark contrast

interface Market {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  result: string;
  isOpen: boolean;
}

const MARKETS: Market[] = [
  { id: '1', name: 'SRI DEVI', openTime: '09:30 AM', closeTime: '10:30 AM', result: '123-45-678', isOpen: false },
  { id: '2', name: 'TIME BAZAR', openTime: '01:00 PM', closeTime: '02:00 PM', result: '456-78-901', isOpen: true },
  { id: '3', name: 'MILAN DAY', openTime: '03:00 PM', closeTime: '05:00 PM', result: '789-01-234', isOpen: true },
  { id: '4', name: 'KALYAN', openTime: '04:00 PM', closeTime: '06:10 PM', result: '234-56-789', isOpen: true },
  { id: '5', name: 'MILAN NIGHT', openTime: '09:00 PM', closeTime: '11:00 PM', result: '345-67-890', isOpen: false },
  { id: '6', name: 'RAJDHANI NIGHT', openTime: '09:30 PM', closeTime: '11:45 PM', result: '567-89-012', isOpen: false },
  { id: '7', name: 'MAIN BAZAR', openTime: '09:45 PM', closeTime: '12:05 AM', result: '678-90-123', isOpen: false },
  { id: '8', name: 'SRI DEVI NIGHT', openTime: '07:00 PM', closeTime: '08:00 PM', result: '890-12-345', isOpen: false },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-yellow-100 selection:text-yellow-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[#EAB308]">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="w-10 h-10 bg-[#EAB308] rounded-xl flex items-center justify-center text-white shadow-lg shadow-yellow-200">
              S
            </div>
            <span>SARA<span className="text-gray-400">365</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium italic">
            <a href="#" className="hover:text-yellow-700 transition-colors">Home</a>
            <a href="#markets" className="hover:text-yellow-700 transition-colors">Markets</a>
            <a href="#features" className="hover:text-yellow-700 transition-colors">Features</a>
            <a href={DOWNLOAD_LINK} className="bg-[#EAB308] text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-yellow-100 hover:scale-105 active:scale-95 transition-all">
              Download App
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#EAB308]">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-bold text-[#EAB308]">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#markets" onClick={() => setIsMenuOpen(false)}>Markets</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href={DOWNLOAD_LINK} className="bg-[#EAB308] text-white py-4 rounded-2xl flex items-center justify-center gap-2">
                <Download size={20} /> Download App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-[#EAB308] px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-yellow-100">
              <Star size={16} fill="currentColor" />
              India's Premier Satta Matka Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              Play Matka Online with <span className="text-[#EAB308]">Sara 365</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              Experience the next generation of gaming. Real-time results, secure payments, and instant payouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={DOWNLOAD_LINK} className="bg-[#EAB308] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-yellow-200 flex items-center justify-center gap-3 hover:bg-yellow-600 hover:-translate-y-1 transition-all group">
                <Download size={24} className="group-hover:bounce" />
                Download App Now
              </a>
              <a href="#markets" className="border-2 border-gray-100 bg-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
                <PlayCircle size={24} />
                View Markets
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-[320px] mx-auto overflow-hidden rounded-[3rem] border-8 border-gray-900 shadow-2xl bg-white aspect-[9/18]">
              {/* This would be the user's image if available, using a placeholder for now due to quota */}
              <img 
                src="https://picsum.photos/seed/sara-yellow-promo/800/1600" 
                alt="Sara 365 Promotion" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white text-center">
                <div className="w-16 h-16 bg-[#EAB308] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-xl">
                  <span className="text-3xl font-black">S</span>
                </div>
                <h3 className="text-2xl font-black mb-2">SARA 365</h3>
                <p className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Official Application</p>
              </div>
            </div>
            {/* Floating elements for visual interest */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Today's Profit</div>
                  <div className="text-sm font-black">+₹89,400</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Notification */}
      <div className="bg-[#EAB308] py-3 text-white font-bold overflow-hidden border-y border-white/10 mt-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="mx-10 flex items-center gap-4">
              <Zap size={18} fill="currentColor" />
              Welcome to SARA 365 - India's Multi-Gaming Platform - Get 100 Bonus Points - Fast Withdrawal - 24/7 Service Available
            </span>
          ))}
        </div>
      </div>

      {/* Markets Section */}
      <section id="markets" className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">Live Market Results</h2>
              <p className="text-gray-500 font-medium">Updated every minute. Win big with real-time accuracy.</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Now
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETS.map((market, idx) => (
              <motion.div 
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-yellow-900/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="font-black text-xl tracking-tight group-hover:text-[#EAB308] transition-colors">
                    {market.name}
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${market.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {market.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-6 mb-6">
                  <div className="text-[#EAB308] font-black text-3xl tracking-widest">
                    {market.result}
                  </div>
                  <div className="text-xs font-bold text-gray-400 mt-2">PREVIOUS RESULT</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Open</span>
                    <span className="text-sm font-bold flex items-center gap-1">
                      <Clock size={12} /> {market.openTime}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Close</span>
                    <span className="text-sm font-bold flex items-center gap-1">
                      <Clock size={12} /> {market.closeTime}
                    </span>
                  </div>
                </div>

                <a 
                  href={DOWNLOAD_LINK}
                  className="w-full bg-[#EAB308] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-all shadow-md shadow-yellow-100 group-hover:scale-[1.02]"
                >
                  <PlayCircle size={18} /> Play Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Rates Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-8">Unbeatable <span className="text-[#EAB308]">Game Rates</span></h2>
              <div className="grid gap-4">
                {[
                  { name: "Single Digit", rate: "10 ka 95" },
                  { name: "Jodi Digit", rate: "10 ka 950" },
                  { name: "Single Panna", rate: "10 ka 1400" },
                  { name: "Double Panna", rate: "10 ka 2800" },
                  { name: "Triple Panna", rate: "10 ka 7000" },
                  { name: "Half Sangam", rate: "10 ka 10000" },
                  { name: "Full Sangam", rate: "10 ka 100000" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold group hover:border-[#EAB308] hover:bg-yellow-50 transition-all">
                    <span className="text-gray-600 group-hover:text-[#EAB308]">{item.name}</span>
                    <span className="bg-[#EAB308] text-white px-4 py-1 rounded-full text-sm">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square bg-yellow-100 rounded-[3rem] overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/sara365-rates-yellow/800/800" 
                  alt="Win Big" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-[#EAB308] rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                    <Star size={40} fill="currentColor" />
                  </div>
                  <h3 className="text-4xl font-black text-[#EAB308] mb-4">Highest Payouts in Industry</h3>
                  <p className="text-yellow-900/60 font-bold max-w-sm">Sara 365 offers the most competitive market rates ensuring you get the maximum value for your play.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Why Players Choose <span className="text-[#EAB308]">Sara 365</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">We provide a secure, fast, and transparent environment for online gaming.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-yellow-100 text-[#EAB308] rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">100% Secure</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Your data and payments are encrypted with high-level security. Safety is our priority.</p>
            </div>

            <div className="p-10 bg-[#EAB308] text-white rounded-[2.5rem] shadow-2xl shadow-yellow-200 hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">Instant Payouts</h3>
              <p className="text-white/80 leading-relaxed font-medium">Winning amounts are credited instantly to your account. Easy withdrawal 24/7.</p>
            </div>

            <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-yellow-100 text-[#EAB308] rounded-2xl flex items-center justify-center mb-8">
                <Smartphone size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">Fast Interface</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Modern interface designed for smooth experience even on slow internet connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter mb-6">
              <div className="w-10 h-10 bg-[#EAB308] rounded-xl flex items-center justify-center text-white">
                S
              </div>
              <span>SARA<span className="text-gray-500">365</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 font-medium">
              India's premier choice for secure and reliable gameplay. Join the community today.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#EAB308] cursor-pointer transition-all">
                <MessageCircle size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#EAB308] cursor-pointer transition-all">
                <HelpCircle size={20} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">How to Play</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Charts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 text-center text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} SARA 365. All rights reserved. 18+ Only.
        </div>
      </footer>

      {/* Sticky Download Button */}
      <motion.a 
        href={DOWNLOAD_LINK}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#EAB308] text-white p-4 md:p-5 rounded-full shadow-2xl flex items-center gap-3 overflow-hidden group shadow-yellow-500/40"
      >
        <Download size={24} className="relative z-10" />
        <span className="hidden md:block font-black text-sm relative z-10 whitespace-nowrap">DOWNLOAD APP</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.a>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      ` }} />
    </div>
  );
};

export default App;
