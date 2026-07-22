import { useState, ChangeEvent, FormEvent } from 'react';
import { ContactFormData } from '../types';
import { 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message or inquiry details.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    // Simulate database write / email trigger
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-colors dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-8">
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0A8F6A]/10 text-[#0A8F6A] dark:bg-emerald-950/40 dark:text-emerald-400 mb-4 animate-bounce">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-950 dark:text-white">Inquiry Received Successfully!</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
            Thank you for contacting Narayan Medical Store. Our team will review your message and contact you via phone or email shortly.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-6 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 rounded-full font-semibold text-xs cursor-pointer transition-all"
            id="contact-success-reset"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-form">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Quick Contact Inquiry</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Have questions about drug availability, medical devices, or wholesale medicine pricing? Drop us a line.
            </p>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold dark:bg-red-950/30 dark:text-red-400 border border-red-100/40">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <User className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
              <span>Full Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Ramesh Prasad"
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
              id="contact-name-input"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Phone className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
              <span>Phone Number <span className="text-red-500">*</span></span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 085212 21372"
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
              id="contact-phone-input"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Mail className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
              <span>Email Address <span className="text-slate-400 font-normal">(Optional)</span></span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. example@gmail.com"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
              id="contact-email-input"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
              <span>Your Message / Question <span className="text-red-500">*</span></span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Detail your requirements (e.g. pricing options, prescription availability check, bulk medical masks inquiry)..."
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
              id="contact-msg-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0A8F6A] hover:brightness-110 text-white font-bold rounded-full shadow-xs transition-all text-sm disabled:bg-[#0A8F6A]/60 disabled:cursor-not-allowed cursor-pointer"
            id="contact-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
