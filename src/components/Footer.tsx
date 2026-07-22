import { useEffect } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, SERVICES } from '../data';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  ShieldCheck, 
  Info,
  Globe
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  openModal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
  currentPage?: PageId;
}

export default function Footer({ setCurrentPage, openModal, currentPage }: FooterProps) {
  useEffect(() => {
    const TRACKING_ENDPOINT = 'https://tools.cprajapati.com/tracker/track.php';
    const urlParams = new URLSearchParams(window.location.search);
    
    let cid = urlParams.get('cid') || localStorage.getItem('wmit_active_cid');
    if (urlParams.get('cid')) {
      localStorage.setItem('wmit_active_cid', urlParams.get('cid')!);
    }
    
    if (!cid) return;

    let visitorId = localStorage.getItem('wmit_visitor_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('wmit_visitor_id', visitorId);

    let sessionId = sessionStorage.getItem('wmit_session_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('wmit_session_id', sessionId);

    const getPageName = () => {
      if (currentPage) {
        return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
      }
      const path = window.location.pathname;
      const segment = path.replace(/\/$/, "").split("/").pop();
      return segment ? segment.split('?')[0] : 'Home';
    };

    const sendInitPayload = () => {
      const payload = {
        cid: cid, visitor_id: visitorId, session_id: sessionId,
        page_name: getPageName(), referrer: document.referrer || '',
        device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
        browser: navigator.userAgent, action: 'init'
      };
      fetch(TRACKING_ENDPOINT, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
    };

    const sendExitPayload = () => {
      const payload = { cid: cid, session_id: sessionId, page_name: getPageName(), action: 'page_change' };
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(TRACKING_ENDPOINT, blob);
      } else {
        fetch(TRACKING_ENDPOINT, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
      }
    };

    sendInitPayload();

    const handleLocationChange = () => {
      sendExitPayload();
      setTimeout(sendInitPayload, 100);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pagehide', sendExitPayload);
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') { sendExitPayload(); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      sendExitPayload();
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pagehide', sendExitPayload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentPage]);

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 transition-colors duration-300 dark:bg-slate-950 border-t border-slate-800">
      
      {/* Upper Grid Area */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A8F6A] text-white shadow-xs">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Narayan Medical store
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="space-y-2.5 pt-2 text-sm">
              <a 
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
                id="footer-call-link"
              >
                <Phone className="h-4 w-4 text-[#0A8F6A]" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <a 
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
                id="footer-whatsapp-link"
              >
                <MessageSquare className="h-4 w-4 text-[#0A8F6A]" />
                <span>WhatsApp Instant Support</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-[#0A8F6A] shrink-0 mt-0.5" />
                <span className="leading-tight">{BUSINESS_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", page: "home" as PageId },
                { label: "About Us", page: "about" as PageId },
                { label: "Our Services", page: "services" as PageId },
                { label: "Gallery", page: "gallery" as PageId },
                { label: "Contact Us", page: "contact" as PageId },
                { label: "WhatsApp Order Form", page: "whatsapp-order" as PageId },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(link.page)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-[#0A8F6A] transition-colors text-left cursor-pointer"
                    id={`footer-link-${link.page}`}
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#0A8F6A]/70" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              
              {/* Special Scroll shortcuts */}
              <li>
                <button
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => {
                      document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-[#0A8F6A] transition-colors text-left cursor-pointer"
                  id="footer-link-testimonials"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#0A8F6A]/70" />
                  <span>Customer Testimonials</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-[#0A8F6A] transition-colors text-left cursor-pointer"
                  id="footer-link-faq"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#0A8F6A]/70" />
                  <span>Frequently Asked FAQs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Offered */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Pharmacy Offerings
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-[#0A8F6A] transition-colors text-left cursor-pointer"
                    id={`footer-srv-${srv.id}`}
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#0A8F6A]/70" />
                    <span className="line-clamp-1">{srv.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="text-[#0A8F6A] hover:text-emerald-400 font-medium text-xs mt-1 inline-flex items-center gap-1 cursor-pointer"
                  id="footer-link-all-services"
                >
                  <span>View All 10 Services</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Hours & Location Map */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#0A8F6A]" />
              <span>Working Hours</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {BUSINESS_INFO.workingHours.map((wh, idx) => (
                <li key={idx} className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span className="font-medium text-slate-300">{wh.day}</span>
                  <span className="text-slate-400 font-mono">{wh.hours}</span>
                </li>
              ))}
              <li className="text-emerald-400/90 text-[11px] leading-tight pt-2 flex items-start gap-1">
                <Info className="h-3 w-3 shrink-0 mt-0.5" />
                <span>Visit our physical pharmacy in Pai Bigha for immediate prescription reviews.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Mini Embedded Iframe for quick references */}
        <div className="mt-8 border-t border-slate-800/80 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2">
            <span className="text-sm font-semibold text-white block">Interactive Store Location</span>
            <span className="text-xs text-slate-400 block max-w-xl">
              Conveniently situated along Pai Bigha Road, Bihar. Drop by for genuine medical supplies or emergency first aid materials.
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-xs font-semibold text-slate-300 transition-colors"
                id="footer-directions-btn"
              >
                <MapPin className="h-3 w-3 text-[#0A8F6A]" />
                <span>Get Driving Directions</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.emergencyPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/40 text-red-300 border border-red-900/40 hover:bg-red-900/30 rounded-lg text-xs font-semibold transition-colors"
                id="footer-emergency-btn"
              >
                <Phone className="h-3 w-3 text-[#0A8F6A]" />
                <span>Emergency Contact ({BUSINESS_INFO.phoneDisplay})</span>
              </a>
            </div>
          </div>
          <div className="h-28 rounded-xl overflow-hidden shadow-inner relative border border-slate-800">
            <iframe
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Narayan Medical Store Map Location"
              className="absolute inset-0 grayscale contrast-125 opacity-80"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Lower Copyright & Legal Footer */}
      <div className="bg-slate-950 text-slate-400 text-xs py-6 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="text-center md:text-left space-y-1">
            <p>© {currentYear} {BUSINESS_INFO.name}. All Rights Reserved. | <a href="https://main.webmakerit.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A8F6A] transition-colors underline decoration-slate-600 underline-offset-2">Developed by WMIT</a></p>
            <p className="text-[10px] text-slate-500">
              Pharmacy License Reg No. Active in State of Bihar | Sourced directly from authorized WHO-GMP distribution channels.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-400">
            <button 
              onClick={() => openModal('privacy')} 
              className="hover:text-[#0A8F6A] transition-colors cursor-pointer"
              id="footer-privacy-btn"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => openModal('terms')} 
              className="hover:text-[#0A8F6A] transition-colors cursor-pointer"
              id="footer-terms-btn"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => openModal('disclaimer')} 
              className="hover:text-[#0A8F6A] transition-colors cursor-pointer"
              id="footer-disclaimer-btn"
            >
              Medical Disclaimer
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
