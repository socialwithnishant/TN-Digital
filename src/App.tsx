/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  Users, 
  Globe, 
  TrendingUp, 
  Megaphone, 
  Code, 
  Smartphone, 
  Settings, 
  Search, 
  Palette, 
  ShieldCheck, 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Zap,
  Target,
  Brain
} from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const CustomCursor = () => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (['A', 'BUTTON'].includes(target.tagName) || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
    >
      <div className={`w-full h-full rounded-full border border-brand-red ${isHovering ? 'bg-brand-red/10' : 'bg-transparent'} transition-colors duration-300`} />
    </motion.div>
  );
};

const WhatsAppFAB = () => {
  return (
    <motion.a
      href="https://wa.me/918448983639"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-3.5 md:p-5 rounded-full shadow-2xl flex items-center justify-center hover:shadow-[#25D366]/40 transition-all duration-300"
    >
      <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
      <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-white text-[#25D366] text-[10px] font-black items-center justify-center">1</span>
      </span>
    </motion.a>
  );
};

const Logo = ({ className = "", whiteText = false }: { className?: string; whiteText?: boolean }) => (
  <div className={`flex items-center text-xl sm:text-2xl font-display font-extrabold tracking-tighter ${className}`}>
    <span className="text-brand-red font-black">T</span>
    <span className={`font-black transition-colors duration-300 ${whiteText ? 'text-white' : 'text-brand-black'}`}>N</span>
    <span className={`ml-1 text-sm sm:text-lg font-bold tracking-normal transition-colors duration-300 ${whiteText ? 'text-white/90' : 'text-gray-800'}`}>Digitals.</span>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Strategy AI', href: '#ai-strategy' },
    { name: 'Results', href: '#results' },
    { name: 'Contact', href: '#contact' },
  ];

  const forceWhiteHeader = !isScrolled && !isMobileMenuOpen;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-3 border-b border-gray-100 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="hover:opacity-80 transition-opacity">
            <Logo whiteText={forceWhiteHeader} />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`text-xs font-bold tracking-widest uppercase hover:text-brand-red transition-colors ${forceWhiteHeader ? 'text-white/80 hover:text-white' : 'text-brand-black/60 hover:text-brand-black'}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="group relative bg-brand-black text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest overflow-hidden transition-all"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-brand-red translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 focus:outline-none ${forceWhiteHeader ? 'text-white hover:bg-white/10' : 'text-brand-black hover:bg-black/5'}`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-white z-[60] flex flex-col p-6 pt-24 overflow-y-auto"
          >
            <div className="absolute top-6 left-6 flex items-center">
              <Logo whiteText={false} />
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-brand-black hover:bg-black/5 p-2 rounded-xl transition-colors"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-black text-brand-black border-b border-gray-100 pb-2 hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-12 bg-brand-red text-white py-4 rounded-2xl text-center font-black uppercase tracking-widest hover:bg-brand-black transition-colors"
            >
              Get Started Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-brand-black overflow-hidden px-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-brand-red/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <Sparkles className="text-brand-red" size={14} />
          <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">AI-Powered Agency</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-display font-extrabold text-white tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-12"
        >
          GROWTH <br />
          <span className="text-brand-red">WITHOUT</span> <br />
          LIMITS.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-xl mx-auto text-gray-400 text-base md:text-xl font-medium tracking-tight mb-10 md:mb-16 leading-relaxed"
        >
          We build digital influence that lasts. From organic social dominance to high-performance influencer strategies, we turn attention into measurable growth.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <a href="#services" className="bg-white text-brand-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
            What We Do
          </a>
          <a href="#ai-strategy" className="flex items-center justify-center gap-3 bg-brand-red text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-red-500/20 active:scale-95">
            <Sparkles size={18} /> Get A Strategy
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase rotate-90 origin-bottom-left mb-8">SCROLL</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-brand-red to-transparent"></div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-brand-red font-black tracking-[0.3em] uppercase text-xs mb-6 block">Legacy & Vision</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-brand-black mb-8 leading-[0.9]">
                Pioneering <br />Digital Frontiers.
              </h2>
            </div>
            
            <p className="text-xl text-brand-gray leading-relaxed font-medium">
              We specialize in the fast-paced world of digital scaling. Led by <strong>Subham Dawn</strong> and <strong>Nishant Kumar Chaudhary</strong>, our team works at the intersection of creativity and data to turn brands into market leaders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Subham Dawn', role: 'Founder', color: 'brand-red' },
                { name: 'Nishant Kumar Chaudhary', role: 'Co-Founder', color: 'gray-400' }
              ].map((leader) => (
                <div key={leader.name} className="group bg-gray-50 border border-gray-100 p-8 rounded-[2rem] hover:bg-brand-black transition-all duration-500">
                  <h4 className="text-xl font-display font-black text-brand-black group-hover:text-white transition-colors">{leader.name}</h4>
                  <div className={`mt-2 h-1 w-8 bg-brand-red`} />
                  <p className="text-brand-gray group-hover:text-gray-400 text-xs font-bold uppercase tracking-widest mt-4">{leader.role}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 border-2 border-brand-red rounded-full flex items-center justify-center p-2">
                   <div className="h-full w-full bg-brand-red rounded-full flex items-center justify-center text-white text-3xl font-black">15</div>
                </div>
                <div>
                  <h4 className="font-display font-black text-brand-black text-2xl">Years of Dominance</h4>
                  <p className="text-brand-gray font-bold tracking-tight">Consistent ROI. Global scale. Unmatched precision.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-100 ring-1 ring-black/5 relative z-10 transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80" 
                alt="Digital Strategy" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-brand-red font-black text-xs uppercase tracking-widest">Growth Metric</p>
                  <p className="text-white font-display font-black text-4xl">450% ↑</p>
                </div>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white">
                  <ArrowRight />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-full h-full border border-gray-100 rounded-[4rem] -z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AIStrategyTool = () => {
  const [niche, setNiche] = useState('');
  const [strategy, setStrategy] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStrategy = async () => {
    if (!niche) return;
    setLoading(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({ 
        model: "gemini-2.5-flash",
        contents: `Act as a senior digital marketing strategist. Provide a clear, actionable growth roadmap for a business in the ${niche} niche. 
        Structure: 
        1. Branding & Identity (How to position) 
        2. Content Strategy (What to post) 
        3. Distribution (Where to advertise)
        Use a professional, helpful tone. No generic marketing jargon. Max 250 words.`
      });
      setStrategy(response.text || "No strategy generated.");
    } catch (err) {
      setError("Unable to generate strategy. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-extrabold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const renderFormattedText = (rawText: string) => {
    return rawText.split('\n').map((line, i) => {
      const cleanLine = line.trim();
      if (!cleanLine) return null;

      // Check for headings starting with a number or "#"
      const headingMatch = cleanLine.match(/^(?:\d+\.\s*|###?\s*|Strategic\s+Objective\s*:\s*)(.+)$/i);
      if (headingMatch) {
        return (
          <h4 key={i} className="text-base font-display font-black text-white mt-6 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-brand-red rounded-full inline-block" />
            {parseBoldText(headingMatch[1])}
          </h4>
        );
      }

      // Check for list items starting with "-", "*" or "•"
      const listMatch = cleanLine.match(/^[-*•]\s*(.+)$/);
      if (listMatch) {
        return (
          <div key={i} className="flex gap-3 pl-3 mb-2">
            <span className="text-brand-red font-black">•</span>
            <p className="text-gray-300 font-medium text-sm leading-relaxed">{parseBoldText(listMatch[1])}</p>
          </div>
        );
      }

      return (
        <p key={i} className="mb-4 text-gray-300 font-medium text-sm leading-relaxed">
          {parseBoldText(cleanLine)}
        </p>
      );
    });
  };

  return (
    <section id="ai-strategy" className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-red font-black tracking-[0.3em] uppercase text-xs mb-6 block">Strategy Preview</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-black mb-8 leading-[0.9]">
              Generate Your <br /><span className="text-brand-red">Growth</span> Plan.
            </h2>
            <p className="text-xl text-brand-gray font-medium mb-12">
              Tell us your business niche, and our strategy generator will compile a custom roadmap for your digital channels.
            </p>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); generateStrategy(); }} 
              className="relative group flex flex-col md:block"
            >
              <input 
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Sustainable Fashion, SaaS, Real Estate"
                className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-4 md:px-8 md:py-6 text-lg md:text-xl font-bold focus:outline-none focus:border-brand-red shadow-sm transition-all md:pr-44"
              />
              <button 
                type="submit"
                disabled={loading || !niche}
                className="mt-3 md:mt-0 w-full md:w-auto md:absolute md:right-3 md:top-3 md:bottom-3 bg-brand-black text-white px-8 py-4 md:py-0 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Thinking...' : 'Get Strategy'}
              </button>
            </form>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {strategy ? (
                <motion.div
                  key="strategy"
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  className="bg-brand-black text-white p-12 rounded-[3rem] shadow-2xl relative"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center">
                      <Sparkles size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Growth Outline</span>
                  </div>
                  
                  <div className="max-w-none mb-12">
                    {renderFormattedText(strategy)}
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ready to execute this?</p>
                    <a href="#contact" className="text-brand-red font-black uppercase tracking-widest text-sm hover:underline">
                      Talk To Our Team
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="aspect-auto md:aspect-[4/3] py-16 px-6 md:p-12 bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Brain size={40} className="text-gray-300" />
                  </div>
                  <h4 className="text-xl font-display font-black text-brand-gray/80 mb-2">Ready to plan your growth?</h4>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Enter your niche to generate insights</p>
                </motion.div>
              )}
            </AnimatePresence>
            {error && (
               <p className="mt-4 text-brand-red text-center font-bold text-xs uppercase tracking-widest animate-pulse">
                {error}
               </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const categories = [
    {
      title: "Architecture",
      icon: <Target className="w-10 h-10" />,
      items: ["Brand Identity", "UI/UX Systems", "Digital Ecosystems"]
    },
    {
      title: "Intelligence",
      icon: <Brain className="w-10 h-10" />,
      items: ["SEO Dominance", "Performance PPC", "Data Analytics"]
    },
    {
      title: "Production",
      icon: <Zap className="w-10 h-10" />,
      items: ["Influencer Marketing", "Content Engines", "Social Scaling"]
    }
  ];

  return (
    <section id="services" className="py-32 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <span className="text-brand-red font-black tracking-[0.3em] uppercase text-xs mb-6 block">Capabilities</span>
            <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9]">
              Strategic <br />Scaling.
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-lg font-medium tracking-tight">
            We build high-performance digital ecosystems designed for sustainable growth and long-term momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10 first:border-0 hover:bg-white/5 transition-all duration-500"
            >
              <div className="text-brand-red mb-12 group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>
              <h3 className="text-3xl font-display font-black mb-8">{cat.title}</h3>
              <ul className="space-y-4">
                {cat.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
                    <div className="w-1 h-1 bg-brand-red rounded-full" />
                    <span className="text-sm font-bold tracking-tight uppercase">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 w-full h-[1px] bg-white/10 overflow-hidden">
                 <div className="w-full h-full bg-brand-red -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  return (
    <section id="results" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 pb-12 border-b border-gray-100">
          <div className="max-w-2xl">
            <span className="text-brand-red font-black tracking-[0.3em] uppercase text-xs mb-6 block">Our Results</span>
            <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] text-brand-black">
              Proven <br />Performance.
            </h2>
          </div>
          <p className="text-brand-gray max-w-sm text-lg font-medium tracking-tight">
            Numbers don't lie. We track every point of engagement to ensure our strategies are delivering real-world growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="grid grid-cols-2 gap-10">
            {[
              { label: 'Campaigns Delivered', value: '500+' },
              { label: 'Client Retention', value: '98%' },
              { label: 'Avg. Organic Growth', value: '315%' },
              { label: 'Industries Mastered', value: '50+' }
            ].map(stat => (
              <div key={stat.label} className="space-y-2">
                <p className="text-4xl md:text-6xl font-display font-black text-brand-black">{stat.value}</p>
                <p className="text-brand-red text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-brand-black p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-10">
              {[
                { label: 'Keyword Rankings', value: '85', growth: '+240%' },
                { label: 'Organic Visibility', value: '92', growth: '+315%' },
                { label: 'Conversion Velocity', value: '78', growth: '+150%' }
              ].map(bar => (
                <div key={bar.label} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-black uppercase tracking-widest text-white">{bar.label}</p>
                    <p className="text-brand-red font-display font-black text-2xl">{bar.growth}</p>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'circOut' }}
                      className="h-full bg-brand-red"
                    />
                  </div>
                </div>
              ))}
              <div className="pt-8 flex items-center gap-4 text-gray-500">
                <ShieldCheck size={20} className="text-brand-red" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified Multi-Channel Scalability Index</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Clientele = () => {
  const brands = ["SAMSUNG", "LAKMÉ", "5paisa", "Oppo", "Airtel", "VIVO"];
  const testimonials = [
    {
      text: "TN Digitals has been transformative for our online presence. Their high-impact approach elevated our brand ROI beyond expectations.",
      author: "Vivek Sikka",
      role: "Managing Director"
    },
    {
      text: "The precision they bring to influencer marketing is unmatched. We saw a 300% increase in engagement within two quarters.",
      author: "Sneha Kapoor",
      role: "Marketing Lead, APAC"
    },
    {
      text: "A strategic powerhouse. They don't just provide services; they provide market dominance.",
      author: "Rahul Mehta",
      role: "Founder, Fintech Solutions"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="clients" className="py-32 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-red font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Elite Clientele</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mb-32 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
          {brands.map((brand) => (
            <div 
              key={brand}
              className="text-2xl md:text-3xl font-display font-black text-brand-black tracking-tighter cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-brand-black/5 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white rounded-3xl sm:rounded-[4rem] p-6 sm:p-12 md:p-24 shadow-2xl border border-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'circOut' }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6 sm:mb-12">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#000" className="text-brand-black" />)}
                </div>
                
                <p className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-display font-medium text-brand-black tracking-tight leading-[1.3] mb-8 sm:mb-16 px-2 sm:px-4">
                  "{testimonials[activeIndex].text}"
                </p>
                
                <div className="flex flex-col items-center">
                   <div className="w-px h-8 sm:h-12 bg-brand-red mb-6 sm:mb-8" />
                   <h5 className="text-2xl font-display font-black text-brand-black tracking-tight leading-none mb-2">
                    {testimonials[activeIndex].author}
                   </h5>
                   <span className="text-brand-red text-xs font-black uppercase tracking-[0.2em]">
                    {testimonials[activeIndex].role}
                   </span>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-8 bg-brand-red' : 'w-2 bg-gray-200 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-brand-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <span className="text-brand-red font-black tracking-[0.3em] uppercase text-xs mb-8 block">Get In Touch</span>
              <h2 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-[0.85]">Ready to start?</h2>
              <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-lg">
                We're always looking for ambitious brands to partner with. Send us a message and let's discuss your roadmap.
              </p>
            </div>
            
            <div className="space-y-10">
              <div className="group flex items-center gap-4 sm:gap-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-white/5 border border-white/10 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Email Us</h4>
                  <a href="mailto:info@tndigital.agency" className="text-lg xs:text-xl sm:text-2xl break-all font-display font-black hover:text-brand-red transition-colors">info@tndigital.agency</a>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 sm:gap-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-white/5 border border-white/10 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  <Phone size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Call Us</h4>
                  <a href="tel:+918448983639" className="text-lg xs:text-xl sm:text-2xl font-display font-black hover:text-brand-red transition-colors">+91 8448983639</a>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 sm:gap-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-white/5 border border-white/10 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  <MapPin size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Our Office</h4>
                  <p className="text-base sm:text-xl font-bold max-w-xs leading-tight">near Airtel tower, Lohiya Nagar, बकेवर, उत्तर प्रदेश 206124</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-12 md:p-16 rounded-3xl sm:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(220,38,38,0.2)] relative border border-white"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name" 
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 sm:py-5 text-brand-black font-bold focus:ring-2 focus:ring-brand-red/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest ml-1">Company Name</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name" 
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 sm:py-5 text-brand-black font-bold focus:ring-2 focus:ring-brand-red/20 transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest ml-1">Work Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Work Email" 
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 sm:py-5 text-brand-black font-bold focus:ring-2 focus:ring-brand-red/20 transition-all" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest ml-1">Project details & goals</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision..." 
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 sm:py-5 text-brand-black font-bold focus:ring-2 focus:ring-brand-red/20 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="group relative w-full bg-brand-black text-white font-black uppercase tracking-[0.3em] py-6 sm:py-8 rounded-2xl overflow-hidden transition-all shadow-2xl active:scale-[0.98] cursor-pointer text-sm sm:text-base"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-brand-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-4"
                >
                  <div className="w-20 h-20 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-black text-brand-black tracking-tight mb-4">Message Sent!</h3>
                  <p className="text-base text-brand-gray font-medium leading-relaxed max-w-sm mx-auto mb-10">
                    Thank you, <span className="font-extrabold text-brand-black">{formData.name}</span>. Our growth strategists will analyze your goals and reach out within 12 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', company: '', email: '', message: '' });
                    }}
                    className="text-xs font-black uppercase tracking-[0.2em] text-brand-red hover:underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Logo whiteText={true} className="grayscale opacity-80" />
            <p className="text-gray-500 text-xl font-medium max-w-sm tracking-tight leading-relaxed">
              We architect the digital future for those ready to lead. Specialized in exponential growth, precision marketing, and elite branding.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Directory</h4>
            <div className="flex flex-col gap-6 text-sm font-bold text-gray-500">
              <a href="#about" className="hover:text-brand-red transition-colors">About Us</a>
              <a href="#services" className="hover:text-brand-red transition-colors">Our Services</a>
              <a href="#results" className="hover:text-brand-red transition-colors">Client Results</a>
              <a href="#contact" className="hover:text-brand-red transition-colors">Get In Touch</a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Connect</h4>
            <div className="flex flex-col gap-6 text-sm font-bold text-gray-500">
              <a href="#" className="hover:text-brand-red transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-red transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-brand-red transition-colors">X / Twitter</a>
              <a href="#" className="hover:text-brand-red transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 text-[10px] tracking-[0.4em] font-black uppercase">
            &copy; {new Date().getFullYear()} TN DIGITALS. FORGING THE FUTURE.
          </p>
          <div className="flex gap-12 text-[10px] font-black text-gray-700 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="font-sans antialiased selection:bg-brand-red selection:text-white">
      <CustomCursor />
      <WhatsAppFAB />
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <AIStrategyTool />
        <Services />
        <Results />
        <Clientele />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
