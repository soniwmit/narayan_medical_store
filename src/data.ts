import { 
  ServiceItem, 
  WhyChooseUsItem, 
  CategoryItem, 
  TrustItem, 
  TestimonialItem, 
  FaqItem, 
  GalleryItem 
} from './types';

export const BUSINESS_INFO = {
  name: "Narayan Medical store",
  legalName: "Narayan Pharmacy & Medical Store",
  tagline: "Your Trusted Medical Store for Genuine Medicines & Healthcare Needs",
  category: "Pharmacy | Medical Store",
  phone: "08521221372",
  phoneDisplay: "+91 85212 21372",
  whatsapp: "918521221372",
  email: "contact@narayanmedicalstore.com",
  location: "3W29+FQ3, Pai Bigha, Bihar 804424",
  addressShort: "Pai Bigha, Bihar - 804424",
  addressFull: "3W29+FQ3, Pai Bigha Road, Pai Bigha, Jahanabad District, Bihar 804424, India",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.932971556637!2d84.9750000!3d25.0250000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2cc81df6f72bf%3A0xe54d9c7923b7e73d!2sNarayan%20Medical%20store!5e0!3m2!1sen!2sin!4v1720310000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Narayan+Medical+store+Pai+Bigha+Bihar",
  workingHours: [
    { day: "Monday", hours: "08:00 AM - 09:30 PM" },
    { day: "Tuesday", hours: "08:00 AM - 09:30 PM" },
    { day: "Wednesday", hours: "08:00 AM - 09:30 PM" },
    { day: "Thursday", hours: "08:00 AM - 09:30 PM" },
    { day: "Friday", hours: "08:00 AM - 09:30 PM" },
    { day: "Saturday", hours: "08:00 AM - 09:30 PM" },
    { day: "Sunday", hours: "08:00 AM - 08:00 PM" }
  ],
  emergencyPhone: "08521221372",
  owner: {
    name: "Narayan Prasad",
    role: "Proprietor & Lead Pharmacist",
    message: "Our primary objective since day one has been to ensure that every family in Pai Bigha and neighboring villages has instant access to 100% genuine, affordable life-saving medicines and healthcare guidance. We treat our customers like family, prioritizing your health and well-being above all else. Feel free to reach out to us directly or drop by the store anytime."
  }
};

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: "w1",
    title: "100% Genuine Medicines",
    description: "Every medicine we sell is sourced directly from certified pharmaceutical companies and authorized distributors.",
    iconName: "ShieldCheck"
  },
  {
    id: "w2",
    title: "Experienced Staff",
    description: "Our knowledgeable pharmacy professionals guide you carefully through dosage, timings, and storage guidelines.",
    iconName: "Users"
  },
  {
    id: "w3",
    title: "Affordable Prices",
    description: "We offer fair and competitive pricing on all brand-name medicines, medical devices, and generic equivalents.",
    iconName: "BadgeIndianRupee"
  },
  {
    id: "w4",
    title: "Fast Service",
    description: "Quick order processing in-store and seamless prescription fulfillment, minimizing your waiting times.",
    iconName: "Zap"
  },
  {
    id: "w5",
    title: "Prescription Medicines",
    description: "Wide range of specialized prescription formulas for chronic conditions, acute illnesses, and post-surgery care.",
    iconName: "FileText"
  },
  {
    id: "w6",
    title: "Healthcare Products",
    description: "Daily essentials, diagnostic devices, first-aid tools, and wellness supplements for every age group.",
    iconName: "HeartPulse"
  },
  {
    id: "w7",
    title: "Trusted Local Pharmacy",
    description: "Deeply rooted in Pai Bigha, Bihar. We have earned the community's trust through transparency and reliability.",
    iconName: "MapPin"
  },
  {
    id: "w8",
    title: "Easy WhatsApp Support",
    description: "Submit prescriptions or a list of medicines easily via WhatsApp and have them prepared for pickup instantly.",
    iconName: "MessageSquare"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "s1",
    title: "Prescription Medicines",
    description: "Safe, authenticated dispensing of multi-category prescription medicines including cardiac, diabetic, respiratory, and neuro formulations.",
    iconName: "FileCheck",
    benefits: ["Fully certified inventory", "Double-checked for accuracy", "Complete guidance on usage & side-effects"]
  },
  {
    id: "s2",
    title: "General Medicines",
    description: "Over-the-counter (OTC) remedies for cold, fever, cough, pain relief, digestive health, and minor seasonal illnesses.",
    iconName: "Pill",
    benefits: ["Wide selection of top brands", "Instantly available stock", "Safe OTC suggestions by experts"]
  },
  {
    id: "s3",
    title: "Health Supplements",
    description: "Multi-vitamins, protein powders, immune boosters, mineral supplements, and nutrition drinks for adults and elders.",
    iconName: "Sparkles",
    benefits: ["Premium certified wellness brands", "Supplements for customized health goals", "Authentic formulations only"]
  },
  {
    id: "s4",
    title: "Baby Care Products",
    description: "Extensive infant range including baby milk formula, diapers, baby wipes, specialized baby washes, lotions, and supplements.",
    iconName: "Baby",
    benefits: ["Dermatologically tested products", "Top brands like Himalaya, Johnson's, Cerelac", "Highly hygienic storage"]
  },
  {
    id: "s5",
    title: "Personal Care Products",
    description: "Premium hair care, skin care, oral hygiene, deodorants, soaps, and organic daily essentials for the entire family.",
    iconName: "Flower",
    benefits: ["Fresh batch stocks", "Trusted chemical-free options", "Gentle formulations for daily use"]
  },
  {
    id: "s6",
    title: "Medical Equipment",
    description: "High-accuracy diagnostic instruments, nebulizers, digital thermometers, vaporizers, and physical recovery devices.",
    iconName: "Stethoscope",
    benefits: ["Pre-tested quality standards", "Brands with valid warranties", "Demo and operational guidance in store"]
  },
  {
    id: "s7",
    title: "Surgical Supplies",
    description: "Disinfected surgical gloves, syringes, surgical masks, protective gowns, sterilizers, catheters, and professional items.",
    iconName: "Scissors",
    benefits: ["Hospital-grade sterility", "Available in single and bulk packs", "Sealed and standardized packaging"]
  },
  {
    id: "s8",
    title: "First Aid Products",
    description: "Complete list of bandages, antiseptic solutions (Dettol, Savlon), medical tapes, cotton rolls, and pre-packaged first aid kits.",
    iconName: "BriefcaseMedical",
    benefits: ["Essential for homes, schools & offices", "Long-shelf life components", "Custom emergency kit preparation"]
  },
  {
    id: "s9",
    title: "Diabetic Care",
    description: "Specialized glucose testing strips, digital glucometers, insulin syringes, diabetic supplements, sugar-free foods, and skin care.",
    iconName: "Activity",
    benefits: ["Top brands: Accu-Chek, OneTouch", "Continuous availability of insulin needles", "Nutritional guides for diabetics"]
  },
  {
    id: "s10",
    title: "Healthcare Essentials",
    description: "Sanitizers, mask layers, daily energy drinks, rehydration salts (ORS), sanitization items, and health checkup aids.",
    iconName: "Heart",
    benefits: ["Ready stock for seasonal requirements", "Essential travel-size packs", "WHO-recommended rehydration formulas"]
  }
];

export const FEATURED_CATEGORIES: CategoryItem[] = [
  {
    id: "c1",
    name: "Tablets",
    description: "Prescription and daily wellness tablets",
    iconName: "Tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Pain Relievers", "Antibiotics", "Antihistamines", "Multivitamins"]
  },
  {
    id: "c2",
    name: "Capsules",
    description: "Gelatin and softgel capsules",
    iconName: "Pill",
    image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Vitamin D3 Softgels", "Omega-3 Fish Oils", "Probiotics", "Iron Supplements"]
  },
  {
    id: "c3",
    name: "Syrups",
    description: "Liquid formulas for pediatric & general use",
    iconName: "Droplet",
    image: "https://images.unsplash.com/photo-1618175551496-932f91ff3bc4?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Cough Syrups", "Iron & Calcium Tonics", "Digestive Enzymes", "Pediatric Drops"]
  },
  {
    id: "c4",
    name: "Injections",
    description: "Sterilized vaccines & injectable medications",
    iconName: "Syringe",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Insulin Cartridges", "Vaccinations", "B12 Shots", "Emergency Ampoules"]
  },
  {
    id: "c5",
    name: "Medical Equipment",
    description: "Home health tracking & monitoring systems",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Digital BP Monitors", "Glucometers", "Pulse Oximeters", "Nebulizers"]
  },
  {
    id: "c6",
    name: "Protein Supplements",
    description: "High quality nutritional shakes & protein formulas",
    iconName: "CupSoda",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Protinex", "Ensure Complete Nutrition", "Whey Isolates", "Kids Growth Drinks"]
  },
  {
    id: "c7",
    name: "Vitamins & Minerals",
    description: "Daily immune health boosters",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Vitamin C (Limcee)", "Zinc Supplements", "Calcium + Vitamin D", "B-Complex Capsules"]
  },
  {
    id: "c8",
    name: "Skin Care",
    description: "Dermatological soaps, creams, and sun protection",
    iconName: "Sparkle",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Moisturizers", "Anti-Fungal Dusting Powders", "Antiseptic Creams", "Medicated Acne Gels"]
  },
  {
    id: "c9",
    name: "Baby Products",
    description: "Gentle baby food & personal care essentials",
    iconName: "Baby",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Baby Formula", "Baby Diapers", "Nourishing Baby Oil", "Baby Wipes"]
  },
  {
    id: "c10",
    name: "Personal Hygiene",
    description: "Sanitary care and general safety hygiene",
    iconName: "Biohazard",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Hand Sanitizers", "Sanitary Pads", "Adult Diapers", "Antiseptic Soaps"]
  },
  {
    id: "c11",
    name: "Orthopedic Support",
    description: "Braces, binders, and joint support sleeves",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Knee Support Braces", "Lumbar Back Belts", "Crepe Bandages", "Ankle Binders"]
  },
  {
    id: "c12",
    name: "Diabetic Care",
    description: "Sugar alternatives and monitoring support",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=300",
    popularItems: ["Accu-Check Strips", "Sugar-Free Sweeteners", "Insulin Syringes", "Diabetic Socks"]
  }
];

export const TRUST_REASONS: TrustItem[] = [
  {
    id: "t1",
    title: "Experienced Pharmacy",
    description: "Serving Pai Bigha families with decades of collective pharmaceutical knowledge and professional expertise.",
    iconName: "Award"
  },
  {
    id: "t2",
    title: "Quality Medicines",
    description: "No local replacements or expired batches. Every single medicine passes rigorous double-check verification.",
    iconName: "ShieldCheck"
  },
  {
    id: "t3",
    title: "Quick Service",
    description: "Skip the long queues. We prepare your prescription list and keep things ready ahead of time.",
    iconName: "Zap"
  },
  {
    id: "t4",
    title: "Friendly Staff",
    description: "Compassionate support, active listening, and customized suggestions for your absolute peace of mind.",
    iconName: "Heart"
  },
  {
    id: "t5",
    title: "Reasonable Pricing",
    description: "Strictly abiding by government-regulated price limits. Genuine discounts on bulk bills.",
    iconName: "BadgeCheck"
  },
  {
    id: "t6",
    title: "Convenient Location",
    description: "Centrally situated in Pai Bigha, Bihar. Easily accessible with ample parking space and directions support.",
    iconName: "MapPin"
  }
];

export const WORKING_PROCESS = [
  {
    step: "01",
    title: "Visit Store or Contact",
    description: "Walk into our modern store in Pai Bigha or send us a quick WhatsApp inquiry with your health demands.",
    iconName: "Store"
  },
  {
    step: "02",
    title: "Share Prescription",
    description: "Hand over your medical slip to our registered pharmacists, or upload a clear photo of it on our WhatsApp form.",
    iconName: "FileImage"
  },
  {
    step: "03",
    title: "Get Medicines",
    description: "Our staff compiles and verifies each item from our temperature-controlled drawers and reviews the prescription details.",
    iconName: "PackageCheck"
  },
  {
    step: "04",
    title: "Easy Payment & Advice",
    description: "Complete your transaction through Cash, UPI/Google Pay, or cards, while receiving comprehensive guidance on medicine dosages.",
    iconName: "CreditCard"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "rev1",
    name: "Ramesh Kumar Sharma",
    role: "Local School Teacher",
    rating: 5,
    date: "June 2026",
    review: "Narayan Medical Store is my go-to place for my father's diabetes medicines. They always have genuine stock, and the staff is incredibly polite. They even guide us on how to use the glucometer properly. Extremely reliable!",
    avatarText: "RK"
  },
  {
    id: "rev2",
    name: "Suman Devi",
    role: "Homemaker, Pai Bigha",
    rating: 5,
    date: "May 2026",
    review: "I order all baby care products and medicines for my toddler through their WhatsApp support. I just send them a photo of the products, and they keep everything ready in a bag. It saves me so much time!",
    avatarText: "SD"
  },
  {
    id: "rev3",
    name: "Dr. Vinay Prasoon",
    role: "General Physician",
    rating: 5,
    date: "April 2026",
    review: "As a healthcare professional, I highly recommend Narayan Medical Store. They store insulin and vaccines in a proper cold-chain refrigerator, which is rare in local regions. Their pharmacy standards are outstanding.",
    avatarText: "VP"
  },
  {
    id: "rev4",
    name: "Amit Kumar Yadav",
    role: "Farmer, Jahanabad District",
    rating: 5,
    date: "June 2026",
    review: "Very reasonable prices compared to other medical stores in the area. They do not charge extra on MRP, and they explain the prescription very carefully in Hindi. Highly satisfied with their supportive attitude.",
    avatarText: "AY"
  },
  {
    id: "rev5",
    name: "Preeti Kumari",
    role: "College Student",
    rating: 5,
    date: "March 2026",
    review: "I bought a digital BP monitor and a nebulizer for my grandparents. The owner showed me a full live demo of how to operate it, measure properly, and clear the tubes. The customer care is unmatched!",
    avatarText: "PK"
  },
  {
    id: "rev6",
    name: "Rajesh Ranjan",
    role: "Businessman",
    rating: 5,
    date: "January 2026",
    review: "Excellent response on WhatsApp. I needed an urgent inhaler at night and messaged them. They replied instantly and kept the store open for an extra 10 minutes so I could collect it. Thank you for your service!",
    avatarText: "RR"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq1",
    question: "Do you supply only genuine medicines?",
    answer: "Yes, 100%. We source our entire inventory directly from authenticated manufacturers and licensed pharmaceutical distributors. We maintain a strict zero-tolerance policy against counterfeit products.",
    category: "Medicines"
  },
  {
    id: "faq2",
    question: "Can I order medicines by sharing my prescription on WhatsApp?",
    answer: "Absolutely! You can use our customized WhatsApp Order Form on the website, upload a picture of your prescription, and click send. We will immediately format the message and open WhatsApp so you can send it to us with one tap. We will have your medicines verified and packaged.",
    category: "Ordering"
  },
  {
    id: "faq3",
    question: "Do you have orthopedic supports and surgical items?",
    answer: "Yes, we stock high-grade orthopedic products like knee caps, cervical collars, lumbar belts, crepe bandages, surgical gloves, syringes, and various hospital-grade disposable items.",
    category: "Products"
  },
  {
    id: "faq4",
    question: "What are your store timings in Pai Bigha?",
    answer: "We are open Monday through Saturday from 08:00 AM to 09:30 PM, and on Sundays from 08:00 AM to 08:00 PM to support the community's healthcare needs.",
    category: "Store"
  },
  {
    id: "faq5",
    question: "Do you offer discounts on monthly chronic illness prescriptions?",
    answer: "Yes, we offer competitive pricing and special discounts for regular customers who purchase their monthly diabetic, cardiac, or respiratory medicines in bulk from us.",
    category: "Pricing"
  },
  {
    id: "faq6",
    question: "How do you store sensitive medicines like insulin?",
    answer: "We have dedicated, temperature-controlled refrigeration systems to store insulin, vaccines, and specific liquid formulations under strict cold-chain environments, ensuring they do not lose potency.",
    category: "Medicines"
  },
  {
    id: "faq7",
    question: "Do you have diagnostic equipment like BP machines and Glucometers in stock?",
    answer: "Yes, we stock digital Blood Pressure monitors, glucometers (and testing strips), pulse oximeters, and nebulizers from top-tier certified medical brands.",
    category: "Products"
  },
  {
    id: "faq8",
    question: "Do you accept digital payments like Google Pay, PhonePe, and UPI?",
    answer: "Yes, we accept all forms of digital payments including UPI, Google Pay, PhonePe, Paytm, BHIM, as well as Credit/Debit cards and traditional cash payments.",
    category: "Payment"
  },
  {
    id: "faq9",
    question: "Is a doctor's prescription mandatory to buy medicines?",
    answer: "For schedule-H, narcotics, and specific strong antibiotics, a valid registered doctor's prescription is legally mandatory. General over-the-counter (OTC) medicines for daily cold, vitamins, or baby-care products do not require a prescription.",
    category: "Ordering"
  },
  {
    id: "faq10",
    question: "How can I locate your pharmacy in Pai Bigha, Bihar?",
    answer: "We are situated at 3W29+FQ3, Pai Bigha, Bihar 804424. You can click the 'Get Directions' button on our homepage to instantly open turn-by-turn navigation on Google Maps.",
    category: "Store"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal1",
    title: "Well-Organized Medicine Shelves",
    category: "medicines",
    imageUrl: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600",
    description: "Our pharmacy is stacked systematically by category to ensure fast and error-free medicine retrieval."
  },
  {
    id: "gal2",
    title: "High-Quality Diagnostic Monitors",
    category: "equipment",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    description: "Reliable Blood Pressure machines, nebulizers, and pulse oximeters available with warranties."
  },
  {
    id: "gal3",
    title: "Authentic Health Supplements",
    category: "products",
    imageUrl: "https://images.unsplash.com/photo-1577401230592-29a471299c82?auto=format&fit=crop&q=80&w=600",
    description: "Premium protein supplements, dietary fibers, and multivitamin setups for regular fitness and recovery."
  },
  {
    id: "gal4",
    title: "Comprehensive Baby Care Section",
    category: "products",
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
    description: "Infant nutrition, organic baby powders, hypoallergenic baby soaps, and skin-friendly wet wipes."
  },
  {
    id: "gal5",
    title: "Surgical & Wound Care Essentials",
    category: "equipment",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=600",
    description: "Sterilized surgical dressing materials, bandages, disposable syringes, and disinfectant fluids."
  },
  {
    id: "gal6",
    title: "Diabetic Monitoring Setup",
    category: "products",
    imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600",
    description: "Glucose tracking systems, lancing devices, insulin storage accessories, and sugar-free replacements."
  },
  {
    id: "gal7",
    title: "Friendly Pharmacy Front Counter",
    category: "store",
    imageUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=600",
    description: "A bright, accessible storefront designed for swift service, consultation, and billing comfort."
  },
  {
    id: "gal8",
    title: "Customer Support & Beratung",
    category: "customers",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    description: "Our dedicated pharmacists reviewing prescription guidelines with clients for safety guidance."
  }
];

export const TIMELINE_HISTORY = [
  {
    year: "2015",
    title: "The Vision Built",
    description: "Narayan Prasad observed a critical shortage of genuine medicines in the rural region of Pai Bigha and formulated a plan for a modern storefront."
  },
  {
    year: "2017",
    title: "Inaugural Launch",
    description: "Narayan Medical Store officially opened doors, establishing a reliable baseline of authorized medical distributors."
  },
  {
    year: "2020",
    title: "Pandemic Response Service",
    description: "Offered relentless community service during Covid-19, supplying sanitizers, safety masks, and oxygen concentrators with zero price markups."
  },
  {
    year: "2023",
    title: "Digitization & WhatsApp Formats",
    description: "Introduced easy prescription photo upload and pre-formatted messaging templates to speed up order preparations."
  },
  {
    year: "2026",
    title: "Leading Local Hub",
    description: "Continuing our service with deep commitment, serving thousands of satisfied families in the Jahanabad/Pai Bigha region."
  }
];
