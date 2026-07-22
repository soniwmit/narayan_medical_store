import { X, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data';

interface ModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export default function Modal({ isOpen, type, onClose }: ModalProps) {
  if (!isOpen || !type) return null;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="h-6 w-6 text-[#0A8F6A]" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-800 dark:text-white">Effective Date: July 7, 2026</p>
              <p>
                At <strong>{BUSINESS_INFO.legalName}</strong>, we are committed to safeguarding our customers' personal and medical data. This Privacy Policy describes how we collect, use, and store information when you visit our store, website, or utilize our WhatsApp Prescription Order form.
              </p>
              
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">1. Patient Information Confidentiality</h4>
              <p>
                Pursuant to the Pharmacy Practice Regulations in India and standard medical ethics, we treat all prescriptions, customer names, contact numbers, and health records with absolute confidentiality. We never rent, share, or sell patient diagnostics or medicine logs to third-party marketing firms.
              </p>

              <h4 className="font-bold text-slate-800 dark:text-white text-sm">2. Prescription Upload Security</h4>
              <p>
                The doctor's prescription images/PDFs uploaded via our digital forms are immediately processed locally and compiled into standard WhatsApp format for safe delivery directly to our licensed pharmacy. No patient documents are permanently indexed on public cloud indices or shared outside authorized staff.
              </p>

              <h4 className="font-bold text-slate-800 dark:text-white text-sm">3. Consent & Indian IT Act Compliance</h4>
              <p>
                By sharing your phone number and medical slip, you consent to our pharmacists reaching out via phone or WhatsApp to verify dosage details or offer generic alternatives. We comply strictly with the Information Technology Act, 2000 regarding patient data management.
              </p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms & Conditions',
          icon: <FileText className="h-6 w-6 text-[#0A8F6A]" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-800 dark:text-white">Last Updated: July 2026</p>
              <p>
                By accessing this portal or buying pharmaceutical items from <strong>{BUSINESS_INFO.name}</strong> (situated in Pai Bigha, Bihar), you agree to comply with the terms listed below.
              </p>

              <h4 className="font-bold text-slate-800 dark:text-white text-sm">1. Prescription Mandate (Schedule H & X Drugs)</h4>
              <p>
                In compliance with the Drugs and Cosmetics Act of India, 1940 and Drugs and Cosmetics Rules, 1945, certain medications (classified as Schedule H, H1, or X) legally require a valid physical or digital prescription signed by a registered medical practitioner (RMP). We reserve the right to refuse dispensing if a valid doctor's slip is missing.
              </p>

              <h4 className="font-bold text-slate-800 dark:text-white text-sm">2. Dosage Verification & Generic Alternatives</h4>
              <p>
                Our pharmacists may suggest high-quality equivalent generic drugs manufactured by WHO-GMP certified laboratories to save patient costs. We ensure that equivalent products contain the identical active salt, strength, and molecular structure.
              </p>

              <h4 className="font-bold text-slate-800 dark:text-white text-sm">3. Pricing & Billing</h4>
              <p>
                All retail bills strictly match the Maximum Retail Price (MRP) mandated by the National Pharmaceutical Pricing Authority (NPPA). Valid printed GST invoices are generated for all transactions upon request.
              </p>
            </div>
          )
        };
      case 'disclaimer':
        return {
          title: 'Medical Disclaimer',
          icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-800 dark:text-white text-sm">CRITICAL USER INFORMATION</p>
              <p>
                The information provided on this website, including lists of categories, health tips, and general over-the-counter medicine indicators, is for <strong>general educational purposes only</strong>.
              </p>
              <p>
                <strong>Not a Substitute for Doctor Advice:</strong> The content on this website does not constitute medical advice, diagnosis, treatment, or professional consulting. Never delay seeking professional medical treatment, disregard scientific advice, or start/stop any therapeutic drugs solely based on material read on this website.
              </p>
              <p>
                <strong>Emergency Warning:</strong> If you or any family member are experiencing a severe medical emergency (such as acute chest pains, extreme breathing issues, high trauma, or poisonings), please visit the nearest hospital emergency room immediately. Our pharmacy does not offer emergency surgical or critical critical care diagnostics.
              </p>
            </div>
          )
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs"
        />

        {/* Modal Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-xs overflow-hidden border border-slate-200 dark:border-slate-800 z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {content.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                {content.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-500 cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {content.body}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 text-right shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#0A8F6A] hover:brightness-110 text-white text-xs font-bold rounded-full shadow-xs transition-colors cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
