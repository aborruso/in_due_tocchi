/**
 * i18n - Internationalization library for Riformula
 * Supports language detection, persistence, and translation
 */

const STORAGE_KEY = 'riformula-language';
const DEFAULT_LANGUAGE = 'it';
const SUPPORTED_LANGUAGES = ['it', 'en'];

/**
 * Detect browser language and fallback to default
 * @returns {string} Language code (it, en)
 */
export function detectLanguage() {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  // Detect from browser
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();

  // Return if supported, otherwise default
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return localStorage.getItem(STORAGE_KEY) || detectLanguage();
}

/**
 * Set language and persist to localStorage
 * @param {string} lang - Language code (it, en)
 */
export function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.warn(`Language ${lang} not supported. Using default: ${DEFAULT_LANGUAGE}`);
    lang = DEFAULT_LANGUAGE;
  }
  localStorage.setItem(STORAGE_KEY, lang);
}

/**
 * Get list of supported languages
 * @returns {Array} Array of language codes
 */
export function getSupportedLanguages() {
  return [...SUPPORTED_LANGUAGES];
}

/**
 * Translation registry - stores all translations
 */
let translations = {};

/**
 * Set translations for all languages
 * @param {Object} data - Translation data object
 */
export function setTranslations(data) {
  translations = data;
}

/**
 * Translate a key to current language
 * @param {string} key - Translation key (dot notation supported)
 * @param {Object} params - Optional parameters for interpolation
 * @returns {string} Translated string
 */
export function t(key, params = {}) {
  const lang = getCurrentLanguage();
  const langData = translations[lang] || translations[DEFAULT_LANGUAGE] || {};

  // Support dot notation (e.g., 'common.share')
  const keys = key.split('.');
  let value = langData;

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      break;
    }
  }

  // If no translation found, return key
  if (typeof value !== 'string') {
    console.warn(`Translation not found for key: ${key} in language: ${lang}`);
    return key;
  }

  // Replace parameters in translation (e.g., {count})
  let result = value;
  for (const [paramKey, paramValue] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
  }

  return result;
}
