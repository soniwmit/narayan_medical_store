import { useEffect } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, FAQS } from '../data';

interface SEOProps {
  page: PageId;
  searchQuery?: string;
}

export default function SEO({ page, searchQuery }: SEOProps) {
  useEffect(() => {
    // 1. Dynamic Meta Titles and Descriptions
    let title = `${BUSINESS_INFO.name} | Pharmacy in Pai Bigha, Bihar`;
    let description = BUSINESS_INFO.tagline;
    let canonicalUrl = window.location.origin;

    switch (page) {
      case 'home':
        title = `${BUSINESS_INFO.name} | Best Pharmacy & Medical Store in Pai Bigha, Bihar`;
        description = `Welcome to Narayan Medical store, Pai Bigha. We offer 100% genuine prescription medicines, OTC items, baby care, orthopedic support, and medical equipment at affordable rates with direct WhatsApp ordering.`;
        canonicalUrl = `${window.location.origin}/`;
        break;
      case 'about':
        title = `About Us | ${BUSINESS_INFO.name} - Trusted Pharmacy in Pai Bigha`;
        description = `Discover our mission, vision, history, and values. Founded by Narayan Prasad, we serve Pai Bigha with authentic pharmaceutical products and wellness accessories since 2017.`;
        canonicalUrl = `${window.location.origin}/about`;
        break;
      case 'services':
        title = `Our Healthcare Services | ${BUSINESS_INFO.name}`;
        description = `Explore our services including certified prescription dispensing, general OTC, diabetic monitoring kits, surgical tools, and top baby care products. We serve Jahanabad District.`;
        canonicalUrl = `${window.location.origin}/services`;
        break;
      case 'gallery':
        title = `Gallery & Store Photos | ${BUSINESS_INFO.name}`;
        description = `View pictures of our modern medical store in Pai Bigha, well-stocked medicine drawers, authentic health supplements, and verified diagnostic tools.`;
        canonicalUrl = `${window.location.origin}/gallery`;
        break;
      case 'contact':
        title = `Contact Us | Phone & Address | ${BUSINESS_INFO.name}`;
        description = `Find Narayan Medical store at Pai Bigha, Bihar. Call +91 85212 21372 or visit us for genuine medicines. View our interactive Google Map and working hours.`;
        canonicalUrl = `${window.location.origin}/contact`;
        break;
      case 'whatsapp-order':
        title = `Quick WhatsApp Prescription Order | ${BUSINESS_INFO.name}`;
        description = `Submit your medicine list or upload a doctor's prescription directly through our quick WhatsApp form to prepare items for immediate collection in Pai Bigha.`;
        canonicalUrl = `${window.location.origin}/whatsapp-order`;
        break;
      default:
        break;
    }

    if (searchQuery) {
      title = `Search results for "${searchQuery}" | ${BUSINESS_INFO.name}`;
    }

    // Set Document Title
    document.title = title;

    // Helper to set or create meta tags
    const updateMetaTag = (attribute: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper to set link tags
    const updateLinkTag = (rel: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    // Update Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', 'Narayan Medical store, pharmacy in Pai Bigha, medical store Bihar, buy medicines Jahanabad, genuine pharmacy, online medicine prescription, healthcare items, medical equipment Pai Bigha, baby products, diabetic care');
    updateMetaTag('name', 'author', 'Narayan Medical store');
    updateMetaTag('name', 'robots', 'index, follow');

    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600');
    updateMetaTag('property', 'og:site_name', BUSINESS_INFO.name);
    updateMetaTag('property', 'og:locale', 'en_IN');

    // Twitter Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600');

    // Canonical
    updateLinkTag('canonical', canonicalUrl);

    // 2. Structured JSON-LD Schemas
    const removeExistingSchemas = () => {
      const existing = document.querySelectorAll('.ld-json-schema');
      existing.forEach((el) => el.remove());
    };
    removeExistingSchemas();

    const addSchema = (schemaObj: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.className = 'ld-json-schema';
      script.innerHTML = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    };

    // Pharmacy/LocalBusiness Schema
    const pharmacySchema = {
      "@context": "https://schema.org",
      "@type": "Pharmacy",
      "@id": `${window.location.origin}/#pharmacy`,
      "name": BUSINESS_INFO.name,
      "alternateName": BUSINESS_INFO.legalName,
      "image": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600",
      "url": window.location.origin,
      "telephone": BUSINESS_INFO.phone,
      "priceRange": "₹-₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3W29+FQ3, Pai Bigha",
        "addressLocality": "Pai Bigha",
        "addressRegion": "Bihar",
        "postalCode": "804424",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.025,
        "longitude": 84.975
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "21:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": BUSINESS_INFO.phone,
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["Hindi", "English"]
      }
    };
    addSchema(pharmacySchema);

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${window.location.origin}/`
        },
        ...(page !== 'home' ? [{
          "@type": "ListItem",
          "position": 2,
          "name": page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' '),
          "item": `${window.location.origin}/${page}`
        }] : [])
      ]
    };
    addSchema(breadcrumbSchema);

    // FAQ Schema (Only on Home/FAQ section)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    addSchema(faqSchema);

  }, [page, searchQuery]);

  return null; // Side effect component
}
