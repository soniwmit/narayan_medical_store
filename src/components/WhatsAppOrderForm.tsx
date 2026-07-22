import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { BUSINESS_INFO } from '../data';
import { OrderFormData } from '../types';
import { 
  FileText, 
  Upload, 
  Send, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Smartphone, 
  Mail, 
  MapPin, 
  Pill, 
  MessageSquare,
  FileCheck2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppOrderForm() {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    mobileNumber: '',
    email: '',
    address: '',
    medicineName: '',
    hasPrescription: false,
    prescriptionName: '',
    message: '',
    preferredDeliveryTime: 'Morning (08:00 AM - 12:00 PM)'
  });

  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const setFile = (file: File) => {
    const isImageOrPdf = file.type.startsWith('image/') || file.type === 'application/pdf';
    if (!isImageOrPdf) {
      setErrorMessage('Please select a valid image (PNG/JPG) or PDF prescription file.');
      return;
    }
    setErrorMessage('');
    setPrescriptionFile(file);
    setFormData(prev => ({
      ...prev,
      hasPrescription: true,
      prescriptionName: file.name
    }));
  };

  const removeFile = () => {
    setPrescriptionFile(null);
    setFormData(prev => ({
      ...prev,
      hasPrescription: false,
      prescriptionName: ''
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.mobileNumber.trim()) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }
    if (!formData.medicineName.trim() && !prescriptionFile) {
      setErrorMessage('Please type in the medicines required or upload a prescription image.');
      return;
    }

    setErrorMessage('');

    // Format the text message according to the required template
    const rawMessage = `Hello Narayan Medical store

Customer Name:
${formData.customerName.trim()}

Phone:
${formData.mobileNumber.trim()}

Email:
${formData.email.trim() || 'Not Provided'}

Medicine Required:
${formData.medicineName.trim() || 'See Prescription Attached'}

Address:
${formData.address.trim() || 'Pickup In-Store'}

Prescription:
${formData.hasPrescription ? `Yes (${formData.prescriptionName})` : 'No'}

Preferred Time:
${formData.preferredDeliveryTime}

Message:
${formData.message.trim() || 'No additional instructions.'}

---
Sent via Narayan Medical Store Portal`;

    // Encode URI
    const encodedText = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSuccessSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-colors dark:bg-slate-900 dark:border-slate-800">
      <div className="p-6 sm:p-8 bg-[#0A8F6A] text-white relative">
        <div className="absolute right-4 top-4 h-20 w-20 text-white/5 pointer-events-none">
          <FileText className="h-full w-full" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">WhatsApp Quick Order</h3>
        <p className="text-sm text-emerald-100 mt-1.5 leading-relaxed">
          Order prescription medicines, baby care, or daily health essentials instantly. Complete the form and hit submit to share the order on WhatsApp.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {isSuccessSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-4"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0A8F6A]/10 text-[#0A8F6A] dark:bg-emerald-950/40 dark:text-emerald-400 mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-white">Order Format Prepared!</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Your details have been beautifully formatted and compiled. A separate WhatsApp window should have opened. If not, tap the button below to retry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A8F6A] hover:brightness-110 text-white font-semibold rounded-full shadow-xs cursor-pointer transition-all"
                id="whatsapp-retry-btn"
              >
                <Send className="h-4 w-4" />
                <span>Re-open WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setIsSuccessSubmitted(false);
                  setFormData({
                    customerName: '',
                    mobileNumber: '',
                    email: '',
                    address: '',
                    medicineName: '',
                    hasPrescription: false,
                    prescriptionName: '',
                    message: '',
                    preferredDeliveryTime: 'Morning (08:00 AM - 12:00 PM)'
                  });
                  setPrescriptionFile(null);
                }}
                 className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 font-semibold rounded-full cursor-pointer transition-all"
                id="whatsapp-new-order-btn"
              >
                <span>Order Another Item</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" id="whatsapp-order-form">
            
            {/* Display error message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/40">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Grid 1: Basic personal details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <User className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                  <span>Customer Name <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Kumar Sharma"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
                  id="order-name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Smartphone className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                  <span>Mobile Number <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 85212 21372"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
                  id="order-mobile"
                />
              </div>

            </div>

            {/* Grid 2: Email and Preferred Delivery Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
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
                  placeholder="e.g. ramesh@gmail.com"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
                  id="order-email"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                  <span>Preferred Pickup/Delivery Time</span>
                </label>
                <select
                  name="preferredDeliveryTime"
                  value={formData.preferredDeliveryTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
                  id="order-time"
                >
                  <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                  <option value="Night (08:00 PM - 09:30 PM)">Night (08:00 PM - 09:30 PM)</option>
                </select>
              </div>

            </div>

            {/* Field 3: Delivery Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                <span>Delivery/Store Pickup Address <span className="text-slate-400 font-normal">(Leave blank for In-Store Pickup)</span></span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g. Ward No. 4, near Shiv Mandir, Pai Bigha, Bihar 804424"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
                id="order-address"
              />
            </div>

            {/* Field 4: Medicines List */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Pill className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                <span>Medicines Required <span className="text-slate-400 font-normal">(Please specify name & dosage quantity)</span></span>
              </label>
              <textarea
                name="medicineName"
                value={formData.medicineName}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g.&#10;- Limcee 500mg (2 strips)&#10;- Paracetamol 650mg (1 strip)&#10;- Himalaya Baby Soap (2 pcs)"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A] font-mono text-xs"
                id="order-medicines"
              />
            </div>

            {/* Field 5: Upload Prescription */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <FileText className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                <span>Upload Doctor's Prescription <span className="text-slate-400 font-normal">(Recommended)</span></span>
              </label>

              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-3xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-200 ${
                  isDragging 
                    ? 'border-[#0A8F6A] bg-[#0A8F6A]/10' 
                    : prescriptionFile 
                      ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10' 
                      : 'border-slate-200 bg-slate-50/30 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900'
                }`}
                id="order-prescription-dropzone"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="hidden"
                />

                {prescriptionFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
                      <FileCheck2 className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {prescriptionFile.name}
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {(prescriptionFile.size / 1024).toFixed(1)} KB • Tap to replace
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="mt-2 text-xs font-semibold text-red-600 hover:text-red-500 px-3 py-1 bg-red-50 hover:bg-red-100 rounded-lg dark:bg-red-950/30 dark:text-red-400"
                      id="order-remove-prescription"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-[#0A8F6A]/10 text-[#0A8F6A] dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center">
                      <Upload className="h-5 w-5" />
                    </div>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Drag & Drop prescription here or <span className="text-[#0A8F6A] dark:text-emerald-400 underline">Browse</span>
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      Supports high-quality prescription photographs (JPG, PNG) or PDF files up to 10MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Field 6: Additional Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-[#0A8F6A] dark:text-emerald-400" />
                <span>Special Notes / Instructions <span className="text-slate-400 font-normal">(Optional)</span></span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={2}
                placeholder="e.g. Please provide generic equivalent if specific brand is out of stock, or call me to confirm alternative."
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:border-[#0A8F6A] focus:bg-white focus:outline-hidden transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#0A8F6A]"
                id="order-instructions"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A8F6A] hover:brightness-110 text-white font-bold rounded-full shadow-xs transition-all text-sm cursor-pointer"
                id="order-submit-btn"
              >
                <Send className="h-4 w-4" />
                <span>Send via WhatsApp</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 font-bold rounded-full transition-all text-sm text-center"
                id="order-call-btn"
              >
                <PhoneCall className="h-4 w-4 text-[#0A8F6A] dark:text-emerald-400" />
                <span>Call Store Now</span>
              </a>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
