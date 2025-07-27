import { i18n } from '@lingui/core';
import { en, hi } from 'make-plural/plurals';

// Import message catalogs
import { messages as enMessages } from './locales/en/messages';
import { messages as hiMessages } from './locales/hi/messages';
import { messages as mrMessages } from './locales/mr/messages';
import { messages as taMessages } from './locales/ta/messages';
import { messages as mlMessages } from './locales/ml/messages';
import { messages as teMessages } from './locales/te/messages';
import { messages as guMessages } from './locales/gu/messages';

// Configure plurals
i18n.loadLocaleData({
  en: { plurals: en },
  hi: { plurals: hi },
  mr: { plurals: hi }, // Using Hindi plurals for Marathi as they're similar
  ta: { plurals: en }, // Using English plurals for Tamil
  ml: { plurals: en }, // Using English plurals for Malayalam
  te: { plurals: hi }, // Using Hindi plurals for Telugu
  gu: { plurals: hi }  // Using Hindi plurals for Gujarati
});

// Load message catalogs
i18n.load({
  en: enMessages,
  hi: hiMessages,
  mr: mrMessages,
  ta: taMessages,
  ml: mlMessages,
  te: teMessages,
  gu: guMessages
});

// Set default locale
const defaultLocale = localStorage.getItem('locale') || 'en';
i18n.activate(defaultLocale);

export { i18n };