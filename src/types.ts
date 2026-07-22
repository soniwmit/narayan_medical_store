export type PageId = 'home' | 'about' | 'services' | 'gallery' | 'contact' | 'whatsapp-order';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // references lucide icons dynamically
  benefits: string[];
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  popularItems: string[];
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  review: string;
  role?: string;
  avatarText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'store' | 'medicines' | 'equipment' | 'products' | 'customers';
  imageUrl: string;
  description: string;
}

export interface OrderFormData {
  customerName: string;
  mobileNumber: string;
  email: string;
  address: string;
  medicineName: string;
  hasPrescription: boolean;
  prescriptionName: string;
  message: string;
  preferredDeliveryTime: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}
