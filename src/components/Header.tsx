import { useState } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data';
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  Sun, 
  Moon, 
  Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export default function Header({ 
  currentPage, 
  setCurrentPage, 
  isDarkMode, 
  setIsDarkMode 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Business Name */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
          id="header-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A8F6A] text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:brightness-110">
            <Activity className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg leading-none text-slate-900 dark:text-white transition-colors">
              Narayan Medical Store
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase mt-0.5">
              Pai Bigha's Trusted Pharmacy
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                currentPage === link.id
                  ? 'text-[#0A8F6A] dark:text-emerald-400'
                  : 'text-slate-600 hover:text-[#0A8F6A] hover:bg-slate-50 dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800/50'
              }`}
              id={`nav-${link.id}`}
            >
              {link.label}
              {currentPage === link.id && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0A8F6A] dark:bg-emerald-400"
                />
              )}
            </button>
          ))}
          
          {/* Testimonial & FAQ quick jump */}
          <button
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                const element = document.getElementById('testimonials-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#0A8F6A] hover:bg-slate-50 rounded-lg cursor-pointer dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800/50"
            id="nav-testimonials"
          >
            Testimonials
          </button>

          <button
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                const element = document.getElementById('faq-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#0A8F6A] hover:bg-slate-50 rounded-lg cursor-pointer dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800/50"
            id="nav-faq"
          >
            FAQ
          </button>
        </nav>

        {/* Call-to-Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors duration-200 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle dark mode"
            id="dark-mode-toggle-desktop"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            id="header-call"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            onClick={() => handleNavClick('whatsapp-order')}
            className="bg-[#0A8F6A] text-white px-5 py-2 rounded-full text-xs font-bold hover:brightness-110 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            id="header-whatsapp-order"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp Order</span>
          </button>
        </div>

        {/* Small Screen Control (Hamburger & Dark Mode) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors duration-200 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle dark mode"
            id="dark-mode-toggle-mobile"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            id="mobile-menu-hamburger"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-slate-100 bg-white/98 dark:border-slate-800 dark:bg-slate-900/98 px-4 py-4 space-y-3 shadow-lg"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === link.id
                      ? 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  id={`mobile-nav-${link.id}`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  handleNavClick('home');
                  setTimeout(() => {
                    const element = document.getElementById('testimonials-section');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                id="mobile-nav-testimonials"
              >
                Testimonials
              </button>

              <button
                onClick={() => {
                  handleNavClick('home');
                  setTimeout(() => {
                    const element = document.getElementById('faq-section');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                id="mobile-nav-faq"
              >
                FAQ
              </button>

              <button
                onClick={() => handleNavClick('whatsapp-order')}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/30 dark:text-teal-400 dark:hover:bg-teal-950/50"
                id="mobile-nav-whatsapp-order"
              >
                WhatsApp Order Form
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 dark:border-slate-700 dark:text-slate-300 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-center"
                id="mobile-call"
              >
                <Phone className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <span>Call Store</span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20Narayan%20Medical%20Store,%20I%20have%20a%20medicine%20inquiry.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 text-center"
                id="mobile-whatsapp-direct"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Quick Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
