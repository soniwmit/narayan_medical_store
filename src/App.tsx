import { useState, useEffect } from 'react';
import { PageId } from './types';
import { 
  BUSINESS_INFO, 
  WHY_CHOOSE_US, 
  SERVICES, 
  FEATURED_CATEGORIES, 
  TRUST_REASONS, 
  WORKING_PROCESS, 
  TESTIMONIALS, 
  FAQS, 
  TIMELINE_HISTORY 
} from './data';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';
import WhatsAppOrderForm from './components/WhatsAppOrderForm';
import ContactForm from './components/ContactForm';
import GalleryViewer from './components/GalleryViewer';
import Modal from './components/Modal';

// Icons
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Dynamic Icon Renderer
function LucideIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('narayan-dark-mode');
    return saved === 'true';
  });

  // Modal State
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // FAQ Expand State
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Apply dark mode classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('narayan-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  // Monitor Scroll for Back To Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search filter logic
  const getFilteredResults = () => {
    if (!searchQuery.trim()) return { categories: [], services: [], faqs: [] };
    const query = searchQuery.toLowerCase();

    const matchedCategories = FEATURED_CATEGORIES.filter(
      cat => cat.name.toLowerCase().includes(query) || 
             cat.description.toLowerCase().includes(query) ||
             cat.popularItems.some(item => item.toLowerCase().includes(query))
    );

    const matchedServices = SERVICES.filter(
      srv => srv.title.toLowerCase().includes(query) || 
             srv.description.toLowerCase().includes(query) ||
             srv.benefits.some(b => b.toLowerCase().includes(query))
    );

    const matchedFaqs = FAQS.filter(
      faq => faq.question.toLowerCase().includes(query) || 
             faq.answer.toLowerCase().includes(query)
    );

    return {
      categories: matchedCategories,
      services: matchedServices,
      faqs: matchedFaqs
    };
  };

  const results = getFilteredResults();
  const totalResultsCount = results.categories.length + results.services.length + results.faqs.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
      
      {/* SEO Injection component */}
      <SEO page={currentPage} searchQuery={searchQuery} />

      {/* Header */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setSearchQuery('');
          setShowSearchResults(false);
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Primary Page Canvas */}
      <main className="flex-grow">
        
        {/* Dynamic Search Results Panel overlay */}
        {showSearchResults && searchQuery.trim().length > 0 && (
          <div className="bg-white border-b border-slate-100 dark:bg-slate-950 dark:border-slate-850 py-8 shadow-inner animate-fade-in">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                    Search Results for <span className="text-teal-600 dark:text-teal-400 font-mono">"{searchQuery}"</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Found {totalResultsCount} matching medical categories, services, or FAQs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
                  id="search-close-btn"
                >
                  Clear Search
                </button>
              </div>

              {totalResultsCount === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-3xl">
                  <Icons.SearchX className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    No matching medicines or services found.
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Try searching for common terms like "Tablet", "Insulin", "Diabetic", "Baby", "Vitamins", or "BP". Or submit a custom request via our WhatsApp Order Form.
                  </p>
                  <button
                    onClick={() => {
                      setCurrentPage('whatsapp-order');
                      setSearchQuery('');
                      setShowSearchResults(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all"
                    id="search-no-results-whatsapp"
                  >
                    <Icons.MessageSquare className="h-3.5 w-3.5" />
                    <span>Inquire via WhatsApp Order Form</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Categorical Results */}
                  {results.categories.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        Matching Product Categories
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {results.categories.map((cat) => (
                          <div 
                            key={cat.id} 
                            onClick={() => {
                              setCurrentPage('home');
                              setShowSearchResults(false);
                              setTimeout(() => {
                                document.getElementById(`category-${cat.id}`)?.scrollIntoView({ behavior: 'smooth' });
                              }, 200);
                            }}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-500 transition-all dark:bg-slate-900 dark:border-slate-800 flex gap-3 items-start cursor-pointer"
                          >
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center">
                              <LucideIcon name={cat.iconName} className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cat.name}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{cat.description}</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {cat.popularItems.slice(0, 2).map((pi, i) => (
                                  <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded-md border border-slate-100 dark:border-slate-750 font-mono">
                                    {pi}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services Results */}
                  {results.services.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        Matching Healthcare Services
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.services.map((srv) => (
                          <div 
                            key={srv.id}
                            onClick={() => {
                              setCurrentPage('services');
                              setShowSearchResults(false);
                            }}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-500 transition-all dark:bg-slate-900 dark:border-slate-800 flex gap-3 cursor-pointer"
                          >
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center">
                              <LucideIcon name={srv.iconName} className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{srv.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{srv.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ Results */}
                  {results.faqs.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        Matching Helpful FAQs
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.faqs.map((faq) => (
                          <div 
                            key={faq.id}
                            onClick={() => {
                              setCurrentPage('home');
                              setShowSearchResults(false);
                              setTimeout(() => {
                                document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                                setExpandedFaqId(faq.id);
                              }, 200);
                            }}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-500 transition-all dark:bg-slate-900 dark:border-slate-800 cursor-pointer"
                          >
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <Icons.HelpCircle className="h-4 w-4 text-teal-500 shrink-0" />
                              <span>{faq.question}</span>
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instant order prompt */}
                  <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl dark:bg-teal-950/20 dark:border-teal-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                      <span className="text-sm font-bold text-teal-900 dark:text-teal-300">Need specific dosages of these matching items?</span>
                      <p className="text-xs text-teal-700/90 dark:text-teal-400/85 mt-0.5">Prepare an instant WhatsApp order slip with our automated generator.</p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage('whatsapp-order');
                        setSearchQuery('');
                        setShowSearchResults(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4.5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                      id="search-cta-whatsapp-btn"
                    >
                      Fill Order Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dynamic SPA Pages Router mapping */}
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* 1. HERO SECTION */}
              <section className="px-4 py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="mx-auto max-w-7xl">
                  
                  {/* Outer Hero Card - Clean Minimalism */}
                  <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs p-6 sm:p-10 md:p-12">
                    
                    {/* Decorative elegant skew container from Clean Minimalism design theme */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/25 dark:bg-blue-950/10 skew-x-[-12deg] translate-x-12 pointer-events-none hidden lg:block" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      
                      {/* Hero Left Content */}
                      <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-widest rounded-full dark:bg-blue-950/30 dark:text-blue-400">
                          <Icons.Sparkles className="h-3 w-3" />
                          <span>Certified Healthcare Partner</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                          Your Trusted Pharmacy <br/>
                          <span className="text-[#0A8F6A] font-display">in Pai Bigha.</span>
                        </h1>

                        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                          Providing genuine medicines, baby care, surgical supplies, and personal essentials at the most affordable local prices. Backed by dedicated local trust.
                        </p>

                        {/* Integrated Medicine Search Box widget */}
                        <div className="max-w-xl mx-auto lg:mx-0 relative pt-2" id="hero-search-box">
                          <div className="relative rounded-2xl shadow-xs border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-950 flex items-center">
                            <Icons.Search className="h-5 w-5 text-slate-400 ml-3 shrink-0" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchResults(true);
                              }}
                              placeholder="Search medicines (e.g. Paracetamol, Limcee, Diaper, Glucometer)..."
                              className="w-full bg-transparent px-3 py-2 text-sm focus:outline-hidden dark:text-white"
                              id="search-input"
                            />
                            {searchQuery && (
                              <button
                                onClick={() => {
                                  setSearchQuery('');
                                  setShowSearchResults(false);
                                }}
                                className="p-1 mr-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                              >
                                <Icons.X className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setShowSearchResults(true)}
                              className="px-5 py-2.5 bg-[#0A8F6A] hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
                              id="search-submit-btn"
                            >
                              Search
                            </button>
                          </div>
                          <div className="flex gap-2 items-center mt-2.5 text-[11px] text-slate-500 px-1 dark:text-slate-400">
                            <span className="font-semibold text-slate-600 dark:text-slate-300">Popular:</span>
                            {["Limcee", "Protein", "BP Monitor", "Baby Care"].map((tag, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSearchQuery(tag);
                                  setShowSearchResults(true);
                                }}
                                className="hover:text-[#0A8F6A] dark:hover:text-emerald-400 underline cursor-pointer"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Hero Buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                          <button
                            onClick={() => {
                              setCurrentPage('whatsapp-order');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A8F6A] text-white font-bold rounded-2xl shadow-sm hover:shadow-md hover:brightness-110 transition-all cursor-pointer"
                            id="hero-whatsapp-btn"
                          >
                            <Icons.MessageSquare className="h-4 w-4" />
                            <span>Order Medicines Now</span>
                          </button>

                          <a
                            href={`tel:${BUSINESS_INFO.phone}`}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-2xl shadow-xs transition-all dark:bg-slate-800 dark:hover:bg-slate-700"
                            id="hero-call-btn"
                          >
                            <Icons.PhoneCall className="h-4 w-4 text-emerald-400" />
                            <span>Store Support</span>
                          </a>

                          <a
                            href={BUSINESS_INFO.googleMapsDirectionsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl shadow-xs transition-all dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800"
                            id="hero-directions-btn"
                          >
                            <Icons.MapPin className="h-4 w-4 text-emerald-600" />
                            <span>Store Location</span>
                          </a>
                        </div>

                        {/* Simple trust metrics banner */}
                        <div className="pt-6 border-t border-slate-150/80 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                          <div>
                            <span className="block text-xl font-bold text-slate-900 dark:text-white">100%</span>
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Genuine Stock</span>
                          </div>
                          <div>
                            <span className="block text-xl font-bold text-slate-900 dark:text-white">2017</span>
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Established</span>
                          </div>
                          <div>
                            <span className="block text-xl font-bold text-slate-900 dark:text-white">4.9 ★</span>
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">320+ Reviews</span>
                          </div>
                        </div>

                      </div>

                      {/* Hero Right Media illustration */}
                      <div className="lg:col-span-5 relative flex justify-center">
                        <div className="relative h-72 w-72 sm:h-96 sm:w-96 rounded-3xl overflow-hidden shadow-xs border-4 border-white dark:border-slate-850 bg-slate-100 dark:bg-slate-800 group">
                          <img
                            src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600"
                            alt="Narayan Medical Store front illustration"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          {/* Emergency sticker widget */}
                          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-slate-100 flex items-center gap-3 dark:bg-slate-900/95 dark:border-slate-800">
                            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 dark:bg-red-950/40 dark:text-red-400">
                              <Icons.HeartPulse className="h-5 w-5 animate-pulse" />
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-slate-950 dark:text-white">Emergency Support</span>
                              <span className="block text-[10px] text-slate-500 dark:text-slate-400">Direct dialing for fast stock checks</span>
                              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-xs font-bold text-teal-600 hover:underline dark:text-teal-400 mt-0.5 block">
                                {BUSINESS_INFO.phoneDisplay}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </section>

              {/* 2. WHY CHOOSE US */}
              <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Pharmacy Benefits</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                      Why Choose Narayan Medical Store?
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      We pride ourselves on offering first-class pharmaceutical integrity and personal advisory support to families in Pai Bigha.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {WHY_CHOOSE_US.map((item, index) => {
                      const cardStyles = [
                        { bg: 'bg-emerald-50/60 dark:bg-emerald-950/20', border: 'border-emerald-100 dark:border-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-100/50 dark:bg-emerald-900/40' },
                        { bg: 'bg-blue-50/60 dark:bg-blue-950/20', border: 'border-blue-100 dark:border-blue-900/20', text: 'text-blue-600 dark:text-blue-400', iconBg: 'bg-blue-100/50 dark:bg-blue-900/40' },
                        { bg: 'bg-orange-50/60 dark:bg-orange-950/20', border: 'border-orange-100 dark:border-orange-900/20', text: 'text-orange-600 dark:text-orange-400', iconBg: 'bg-orange-100/50 dark:bg-orange-900/40' },
                        { bg: 'bg-purple-50/60 dark:bg-purple-950/20', border: 'border-purple-100 dark:border-purple-900/20', text: 'text-purple-600 dark:text-purple-400', iconBg: 'bg-purple-100/50 dark:bg-purple-900/40' }
                      ];
                      const style = cardStyles[index % cardStyles.length];
                      return (
                        <div 
                          key={item.id}
                          className={`p-5 rounded-2xl border ${style.border} ${style.bg} hover:shadow-xs transition-all duration-300 flex flex-col gap-4`}
                        >
                          <div className={`h-11 w-11 rounded-xl ${style.iconBg} ${style.text} flex items-center justify-center shrink-0`}>
                            <LucideIcon name={item.iconName} className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-950 dark:text-white leading-snug">{item.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 3. OUR SERVICES OVERVIEW */}
              <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-xl space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Our Offerings</span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                        Comprehensive Medical Services
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Discover our primary services compiled carefully to assist your family's dynamic health and nursing requirements.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs rounded-full shadow-xs transition-all dark:bg-slate-850 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
                      id="view-all-services-cta"
                    >
                      <span>Explore All Services</span>
                      <Icons.ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.slice(0, 6).map((srv) => (
                      <div 
                        key={srv.id}
                        className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-850 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="h-10 w-10 rounded-xl bg-[#0A8F6A]/10 text-[#0A8F6A] dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <LucideIcon name={srv.iconName} className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-950 dark:text-white leading-tight">{srv.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{srv.description}</p>
                          </div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <ul className="space-y-1.5">
                            {srv.benefits.slice(0, 2).map((bf, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                                <Icons.CheckCircle2 className="h-3.5 w-3.5 text-[#0A8F6A] shrink-0" />
                                <span className="line-clamp-1">{bf}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* 4. FEATURED CATEGORIES GRID */}
              <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Our Products</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                      Featured Medicine Categories
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Explore our 12 complete categories stored under certified environment guidelines in Pai Bigha.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {FEATURED_CATEGORIES.map((cat) => (
                      <div 
                        key={cat.id}
                        id={`category-${cat.id}`}
                        className="group bg-slate-50/50 rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800"
                      >
                        <div className="aspect-16/10 bg-slate-200 overflow-hidden relative">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-[#0A8F6A]/95 backdrop-blur-md text-white flex items-center justify-center">
                            <LucideIcon name={cat.iconName} className="h-4.5 w-4.5" />
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-[#0A8F6A] dark:group-hover:text-emerald-400 transition-colors">
                            {cat.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {cat.description}
                          </p>
                          <div className="pt-2 border-t border-slate-150 dark:border-slate-800">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                              Popular Stock
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {cat.popularItems.map((item, idx) => (
                                <span 
                                  key={idx} 
                                  className="text-[9px] px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 font-medium text-slate-600 dark:text-slate-300"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* 5. WHY CUSTOMERS TRUST US */}
              <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Trust & Quality</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                      Why Customers Trust Our Pharmacy
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Our practices guarantee a safe, reliable, and transparent supply for all your prescription wellness needs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TRUST_REASONS.map((item) => (
                      <div 
                        key={item.id}
                        className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs transition-all dark:bg-slate-900 dark:border-slate-800 flex gap-4"
                      >
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-[#0A8F6A]/10 text-[#0A8F6A] dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
                          <LucideIcon name={item.iconName} className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-950 dark:text-white">{item.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 6. WORKING PROCESS */}
              <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Simple Steps</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                      How It Works
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Get your pharmaceutical items prepared in four seamless stages.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Background connector line */}
                    <div className="hidden lg:block absolute top-12 left-1/8 right-1/8 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
                    
                    {WORKING_PROCESS.map((item, idx) => (
                      <div key={idx} className="relative text-center space-y-4 flex flex-col items-center">
                        <div className="h-14 w-14 rounded-full bg-[#0A8F6A] text-white font-mono font-bold flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-sm relative z-10 hover:scale-105 transition-transform">
                          <LucideIcon name={item.iconName} className="h-5 w-5" />
                        </div>
                        <div className="space-y-1.5">
                          <span className="block text-[10px] font-bold uppercase text-[#0A8F6A] tracking-widest dark:text-emerald-400">
                            Step {item.step}
                          </span>
                          <h3 className="text-sm font-bold text-slate-950 dark:text-white leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 7. TESTIMONIALS SECTION */}
              <section id="testimonials-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
                    <div className="text-center sm:text-left space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Patient Reviews</span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                        Why Customers Trust Us
                      </h2>
                    </div>
                    {/* Google ratings badge */}
                    <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-2xl border border-slate-200 dark:bg-slate-950 dark:border-slate-850">
                      <Icons.Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                      <div>
                        <span className="block text-xs font-bold text-slate-950 dark:text-white">4.9/5 Rating</span>
                        <span className="block text-[9px] text-slate-400">Based on 320+ Local Patient Votes</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((item) => (
                      <div 
                        key={item.id}
                        className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex gap-0.5 text-amber-400">
                            {[...Array(item.rating)].map((_, i) => (
                              <Icons.Star key={i} className="h-4 w-4 fill-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                            "{item.review}"
                          </p>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-850 mt-4">
                          <div className="h-10 w-10 rounded-full bg-[#0A8F6A]/10 text-[#0A8F6A] dark:bg-teal-950/40 dark:text-teal-400 font-bold text-xs flex items-center justify-center uppercase shrink-0">
                            {item.avatarText}
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-950 dark:text-white leading-tight">
                              {item.name}
                            </span>
                            <span className="block text-[10px] text-slate-400 leading-tight">
                              {item.role} • {item.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* 8. FAQ SECTION */}
              <section id="faq-section" className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center space-y-3 mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Patient Support</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Clear answers regarding prescription regulations, storage, home health kits, and custom ordering.
                    </p>
                  </div>

                  <div className="space-y-3" id="faq-accordions">
                    {FAQS.map((faq) => {
                      const isExpanded = expandedFaqId === faq.id;
                      return (
                        <div 
                          key={faq.id}
                          className="border border-slate-200 rounded-2xl overflow-hidden transition-all dark:border-slate-800"
                        >
                          <button
                            onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 dark:text-white dark:bg-slate-900/30 dark:hover:bg-slate-900 cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm leading-snug">{faq.question}</span>
                            <span className="p-1 bg-white dark:bg-slate-800 rounded-lg text-slate-400">
                              {isExpanded ? <Icons.ChevronUp className="h-4 w-4" /> : <Icons.ChevronDown className="h-4 w-4" />}
                            </span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="bg-white dark:bg-slate-900"
                              >
                                <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 9. GOOGLE MAPS SECTION */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-250 dark:border-slate-800 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-4 space-y-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Visit Store</span>
                      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                        Find Us in Pai Bigha, Bihar
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Centrally located along Pai Bigha Road, Jahanabad District. We have dedicated parking space and easily accessible walkways.
                      </p>
                      
                      <div className="space-y-3.5 text-xs">
                        <div className="flex gap-2.5 items-start text-slate-600 dark:text-slate-300">
                          <Icons.MapPin className="h-4.5 w-4.5 text-[#0A8F6A] shrink-0" />
                          <span>{BUSINESS_INFO.addressFull}</span>
                        </div>
                        <div className="flex gap-2.5 items-start text-slate-600 dark:text-slate-300">
                          <Icons.Phone className="h-4.5 w-4.5 text-[#0A8F6A] shrink-0" />
                          <span>Call Shop: <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold hover:underline">{BUSINESS_INFO.phoneDisplay}</a></span>
                        </div>
                        <div className="flex gap-2.5 items-start text-slate-600 dark:text-slate-300">
                          <Icons.Clock className="h-4.5 w-4.5 text-[#0A8F6A] shrink-0" />
                          <span>Open Daily: 08:00 AM - 09:30 PM (Sundays close at 08:00 PM)</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <a
                          href={BUSINESS_INFO.googleMapsDirectionsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0A8F6A] hover:brightness-110 text-white font-bold rounded-full text-xs shadow-xs transition-all"
                          id="map-directions-btn"
                        >
                          <Icons.MapPin className="h-3.5 w-3.5" />
                          <span>Get Driving Directions</span>
                        </a>
                      </div>
                    </div>

                    <div className="lg:col-span-8 h-96 rounded-3xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800 relative bg-slate-100">
                      <iframe
                        src={BUSINESS_INFO.googleMapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Narayan Medical Store Map"
                        className="absolute inset-0"
                      ></iframe>
                    </div>

                  </div>
                </div>
              </section>

              {/* 10. CONTACT CTA */}
              <section className="py-16 bg-[#0A8F6A] text-white relative overflow-hidden dark:bg-emerald-900">
                <div className="absolute right-0 top-0 h-40 w-40 bg-white/5 rounded-full blur-2xl" />
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6 relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
                    Need Essential Medicines Right Now?
                  </h2>
                  <p className="text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
                    Submit your medicine specifications or prescription snap directly. Our experienced pharmacists are standing by on WhatsApp to format your order checklist instantly.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentPage('whatsapp-order');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-[#0A8F6A] font-bold rounded-full shadow-xs transition-all cursor-pointer text-xs sm:text-sm"
                      id="cta-whatsapp-order"
                    >
                      <Icons.MessageSquare className="h-4 w-4" />
                      <span>WhatsApp Order Form</span>
                    </button>

                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A8F6A]/20 hover:bg-[#0A8F6A]/35 text-white border border-white/20 font-bold rounded-full shadow-xs transition-all text-xs sm:text-sm"
                      id="cta-call"
                    >
                      <Icons.PhoneCall className="h-4 w-4" />
                      <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16 space-y-16"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Intro Hero banner */}
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">Our Journey</span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                    Our Business Story & Core Values
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Discover how Narayan Medical Store became the cornerstone of verified pharmacy services in Pai Bigha, Bihar.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Story text */}
                  <div className="lg:col-span-7 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-display">
                      Est. 2017: A Pledge for Authentic Local Healthcare
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      For generations, families in local regions of Bihar faced serious roadblocks in sourcing verified, authenticated pharmaceutical medications for chronic conditions like asthma, blood pressure, and cardiac conditions.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Founded by <strong>{BUSINESS_INFO.owner.name}</strong>, Narayan Medical Store was inaugurated with a single, unyielding mission: to establish a modern, clean, temperature-regulated pharmacy where residents receive 100% genuine products directly sourced from licensed companies with valid GST inputs.
                    </p>
                    
                    {/* Mission Vision Value Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-teal-50/40 rounded-2xl border border-teal-100/50 dark:bg-slate-800/40 dark:border-slate-800 space-y-2">
                        <Icons.Compass className="h-5 w-5 text-teal-600 shrink-0" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300">Our Mission</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          To make authenticated monthly chronic medicine supply accessible and affordable to every family in Pai Bigha and Jahanabad District.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100/50 dark:bg-slate-800/40 dark:border-slate-800 space-y-2">
                        <Icons.Eye className="h-5 w-5 text-blue-600 shrink-0" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">Our Vision</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          To expand our digital support features, ensuring every patient can consult pharmacists, check salt equivalencies, and order via WhatsApp seamlessly.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Owner message callout */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-lg dark:bg-slate-900 dark:border-slate-800 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center">
                      <Icons.Quote className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                      "{BUSINESS_INFO.owner.message}"
                    </p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-teal-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                        NP
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-950 dark:text-white leading-tight">
                          {BUSINESS_INFO.owner.name}
                        </span>
                        <span className="block text-[10px] text-slate-400 leading-tight">
                          {BUSINESS_INFO.owner.role}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Timeline History section */}
                <div className="pt-16 space-y-8">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Our Timeline</span>
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-display mt-1">Pharmacy Evolution Over The Years</h2>
                  </div>

                  <div className="relative border-l-2 border-slate-200 dark:border-slate-800 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-8">
                    {TIMELINE_HISTORY.map((tl, i) => (
                      <div key={i} className="relative">
                        {/* Timeline Bullet */}
                        <div className="absolute -left-[31px] sm:-left-[39px] h-4 w-4 rounded-full bg-teal-600 border-4 border-slate-50 dark:border-slate-900" />
                        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-xs space-y-1.5">
                          <span className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 text-xs font-bold rounded-md font-mono">
                            {tl.year}
                          </span>
                          <h3 className="text-sm font-bold text-slate-950 dark:text-white">{tl.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tl.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">Dedicated Healthcare Care</span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                    Our Pharmacy Services & Products
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    We maintain robust compliance, storing medicines inside climate-controlled units and providing full explanations on prescriptions.
                  </p>
                </div>

                {/* 10 Services Detailed Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="services-grid">
                  {SERVICES.map((srv) => (
                    <div 
                      key={srv.id}
                      className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-all"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center shrink-0">
                        <LucideIcon name={srv.iconName} className="h-6 w-6" />
                      </div>
                      <div className="space-y-4 flex-grow">
                        <div>
                          <h2 className="text-base font-bold text-slate-950 dark:text-white leading-snug">
                            {srv.title}
                          </h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                            {srv.description}
                          </p>
                        </div>
                        
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-850">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Key Benefits
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {srv.benefits.map((bf, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                                <Icons.Check className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                                <span>{bf}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FAQ Quick Jump banner */}
                <div className="p-6 sm:p-8 bg-slate-100 rounded-3xl dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-sm font-bold text-slate-950 dark:text-white">Have specific pharmaceutical questions or prescription inquiries?</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Check our FAQ accordion list or call the lead pharmacist.</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setCurrentPage('home');
                        setTimeout(() => {
                          document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }}
                      className="px-4.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl"
                    >
                      Read FAQs
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="px-4.5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl"
                    >
                      Call Shop
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">Visual Showcase</span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                    Our Pharmacy Store Gallery
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    A visual walkthrough of Narayan Medical Store in Pai Bigha, showcasing our tidy medicine shelves, cold storage facilities, and diagnostic meters. Click to view in popup lightbox with Zoom support.
                  </p>
                </div>

                {/* Gallery masonry filter viewer */}
                <GalleryViewer />

              </div>
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Get In Touch</span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                    Contact Our Medical Experts
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    We are always ready to answer your medicine requests, offer suggestions on generics, or discuss corporate/bulk healthcare supplies.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Contact Left: Business details, map, hours */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Details Box */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400">Store Directory</h3>
                      
                      <div className="space-y-4 text-xs sm:text-sm">
                        <div className="flex gap-3 items-start">
                          <div className="p-1.5 bg-slate-50 text-[#0A8F6A] rounded-xl dark:bg-slate-850 dark:text-emerald-400 shrink-0">
                            <Icons.MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-900 dark:text-white">Pharmacy Address</span>
                            <span className="block text-slate-500 dark:text-slate-400 mt-1">{BUSINESS_INFO.addressFull}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="p-1.5 bg-slate-50 text-[#0A8F6A] rounded-xl dark:bg-slate-850 dark:text-emerald-400 shrink-0">
                            <Icons.Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-900 dark:text-white">Phone Numbers</span>
                            <a href={`tel:${BUSINESS_INFO.phone}`} className="block text-[#0A8F6A] dark:text-emerald-400 font-semibold hover:underline mt-1">
                              {BUSINESS_INFO.phoneDisplay}
                            </a>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="p-1.5 bg-slate-50 text-[#0A8F6A] rounded-xl dark:bg-slate-850 dark:text-emerald-400 shrink-0">
                            <Icons.Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-900 dark:text-white">Email Address</span>
                            <span className="block text-slate-500 dark:text-slate-400 mt-1">{BUSINESS_INFO.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 mb-4">Opening Hours</h3>
                      <div className="space-y-2 text-xs">
                        {BUSINESS_INFO.workingHours.map((wh, i) => (
                          <div key={i} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{wh.day}</span>
                            <span className="text-slate-500 dark:text-slate-400 font-mono">{wh.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Contact Right: Contact Form */}
                  <div className="lg:col-span-7">
                    <ContactForm />
                  </div>

                </div>

                {/* Full-width Map section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 text-center">Interactive Google Navigation Map</h3>
                  <div className="h-96 rounded-3xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800">
                    <iframe
                      src={BUSINESS_INFO.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Narayan Medical Store Map Location"
                    ></iframe>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {currentPage === 'whatsapp-order' && (
            <motion.div
              key="whatsapp-order"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
                
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A8F6A] dark:text-emerald-400 block">Digitized Service</span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display dark:text-white">
                    Submit Medicine / Prescription Slip
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Fill in the form with your required items, attach a doctor's slip photo, and let our system compile the exact text formatting before sending over to WhatsApp.
                  </p>
                </div>

                {/* Submital Form */}
                <WhatsAppOrderForm />

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <Footer 
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setSearchQuery('');
          setShowSearchResults(false);
        }}
        openModal={(type) => setActiveModal(type)}
      />

      {/* Legal terms Modals */}
      <Modal 
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* ---------------------------------------------------- */}
      {/* FLOATING ACTION INTERFACES                           */}
      {/* ---------------------------------------------------- */}

      {/* Floating Call Button */}
      <div className="fixed bottom-20 right-4 z-40 sm:bottom-24">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300"
          title="Call Shop"
          id="floating-call-btn"
        >
          <Icons.Phone className="h-5 w-5" />
        </a>
      </div>

      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6">
        <button
          onClick={() => {
            setCurrentPage('whatsapp-order');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-400 hover:scale-105 transition-all duration-300 relative group cursor-pointer"
          title="WhatsApp Order Form"
          id="floating-whatsapp-btn"
        >
          {/* Pulse ring decoration */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10 group-hover:bg-emerald-400/40" />
          <Icons.MessageSquare className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Back To Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="fixed bottom-36 right-4 z-40"
          >
            <button
              onClick={handleScrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 border border-slate-150 shadow-md hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
              title="Scroll back to top"
              id="back-to-top-btn"
            >
              <Icons.ArrowUp className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
