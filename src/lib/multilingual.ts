// Utility functions for multilingual URL management

export const SUPPORTED_LANGUAGES = ['en', 'zh', 'pl'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export interface MultilingualConfig {
  baseUrl: string;
  defaultLanguage: Language;
  supportedLanguages: Language[];
}

export const config: MultilingualConfig = {
  baseUrl: 'https://your-travel-site.com',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'zh', 'pl']
};

export function getCanonicalUrl(lang: Language, path: string = '/'): string {
  return `${config.baseUrl}/${lang}${path}`;
}

export function getHreflangUrls(path: string = '/'): Array<{ lang: string; url: string }> {
  return config.supportedLanguages.map(lang => ({
    lang,
    url: getCanonicalUrl(lang, path)
  }));
}

export function getXDefaultUrl(path: string = '/'): string {
  return getCanonicalUrl(config.defaultLanguage, path);
}

export function isValidLanguage(lang: string): lang is Language {
  return config.supportedLanguages.includes(lang as Language);
}

export function getLanguageFromPath(pathname: string): Language {
  const pathParts = pathname.split('/').filter(Boolean);
  const possibleLang = pathParts[0];
  
  if (isValidLanguage(possibleLang)) {
    return possibleLang;
  }
  
  return config.defaultLanguage;
}

export function getPathWithoutLanguage(pathname: string): string {
  const pathParts = pathname.split('/').filter(Boolean);
  
  if (pathParts.length > 0 && isValidLanguage(pathParts[0])) {
    return '/' + pathParts.slice(1).join('/');
  }
  
  return pathname;
}