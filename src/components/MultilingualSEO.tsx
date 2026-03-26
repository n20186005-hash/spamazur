import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface MultilingualSEOProps {
  currentLang: string;
  availableLangs: string[];
  baseUrl: string;
  pagePath: string;
}

export function MultilingualSEO({ 
  currentLang, 
  availableLangs, 
  baseUrl, 
  pagePath 
}: MultilingualSEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Update canonical tag
    const canonicalUrl = `${baseUrl}/${currentLang}${pagePath}`;
    
    // Remove existing canonical tags
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach(link => link.remove());
    
    // Remove existing hreflang tags
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(link => link.remove());

    // Create new canonical tag
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = canonicalUrl;
    document.head.appendChild(canonicalLink);

    // Create hreflang tags for all languages
    availableLangs.forEach(lang => {
      const hreflangLink = document.createElement('link');
      hreflangLink.rel = 'alternate';
      hreflangLink.hreflang = lang;
      hreflangLink.href = `${baseUrl}/${lang}${pagePath}`;
      document.head.appendChild(hreflangLink);
    });

    // Create x-default hreflang
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = `${baseUrl}/en${pagePath}`;
    document.head.appendChild(xDefaultLink);

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

  }, [currentLang, availableLangs, baseUrl, pagePath, location]);

  return null;
}