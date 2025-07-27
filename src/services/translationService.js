/**
 * Translation service using LibreTranslate API
 * Comprehensive translation for all 7 Indian languages
 * Fallback to local translations if API is not available
 */

// Comprehensive local translations for all 7 languages
const localTranslations = {
  en: {
    // English translations (base language)
  },
  hi: {
    // Navigation & Common
    "Home": "होम",
    "Login": "लॉगिन",
    "Register": "रजिस्टर",
    "Dashboard": "डैशबोर्ड",
    "Logout": "लॉगआउट",
    "Maps": "मैप्स",
    "Group Orders": "समूह ऑर्डर",
    "Market Rates": "बाज़ार दरें",
    "Find Nearby": "आस-पास खोजें",
    
    // Dashboard
    "Food Vendor Dashboard": "फूड वेंडर डैशबोर्ड",
    "Food Supplier Dashboard": "फूड सप्लायर डैशबोर्ड",
    "Manage your food business, suppliers, and orders": "अपने फूड बिजनेस, सप्लायर और ऑर्डर का प्रबंधन करें",
    "Food Orders": "फूड ऑर्डर",
    "Nearby Food Suppliers": "आस-पास के फूड सप्लायर",
    "Within 5km radius": "5 किमी के दायरे में",
    "Daily Revenue": "दैनिक आय",
    "Food Categories": "फूड श्रेणियां",
    "Spices, vegetables, grains": "मसाले, सब्जियां, अनाज",
    
    // Orders & Suppliers
    "Recent Food Orders": "हाल के फूड ऑर्डर",
    "Top Nearby Food Suppliers": "शीर्ष आस-पास के फूड सप्लायर",
    "Bulk Food Orders": "बल्क फूड ऑर्डर",
    "orders completed": "ऑर्डर पूरे किए",
    "Total spent": "कुल खर्च",
    "participants": "प्रतिभागी",
    "target": "लक्ष्य",
    "Deadline": "समय सीमा",
    
    // Status
    "Preparing": "तैयार हो रहा है",
    "Delivered": "डिलीवर किया गया",
    "In Transit": "ट्रांजिट में",
    "Processing": "प्रोसेसिंग",
    "Shipped": "भेजा गया",
    "Accepted": "स्वीकार किया गया",
    "Pending": "लंबित",
    "Completed": "पूर्ण",
    
    // Location & Geography
    "Your Location": "आपका स्थान",
    "Find Food Suppliers Near You": "अपने आस-पास फूड सप्लायर खोजें",
    "Discover local food suppliers and vendors across India": "भारत भर में स्थानीय फूड सप्लायर और वेंडर खोजें",
    "No recent orders in your area": "आपके क्षेत्र में कोई हाल का ऑर्डर नहीं",
    "No suppliers found nearby": "आस-पास कोई सप्लायर नहीं मिला",
    "No bulk orders in your area": "आपके क्षेत्र में कोई बल्क ऑर्डर नहीं",
    
    // Market & Prices
    "Live Market Rates": "लाइव बाज़ार दरें",
    "Real-time commodity prices from Indian mandis": "भारतीय मंडियों से वास्तविक समय की कमोडिटी कीमतें",
    "View All Mandi Prices": "सभी मंडी भाव देखें",
    "Mandi Prices": "मंडी भाव",
    
    // Authentication
    "Street Food Vendor Marketplace": "स्ट्रीट फूड वेंडर मार्केटप्लेस",
    "Connect with local food suppliers and street vendors across India": "भारत भर के स्थानीय फूड सप्लायर और स्ट्रीट वेंडर से जुड़ें",
    "Welcome back": "वापसी पर स्वागत है",
    "Email": "ईमेल",
    "Password": "पासवर्ड",
    "Sign In": "साइन इन",
    "Create Account": "खाता बनाएं",
    
    // Food Categories
    "Vegetables": "सब्जियां",
    "Fruits": "फल",
    "Spices": "मसाले",
    "Oils": "तेल",
    "Grains": "अनाज",
    "Dairy": "डेयरी",
    "Beverages": "पेय पदार्थ",
    "Snacks": "स्नैक्स",
    "Condiments": "मसाले और चटनी",
    "Meat": "मांस"
  },
  
  mr: {
    // Navigation & Common
    "Home": "होम",
    "Login": "लॉगिन",
    "Register": "नोंदणी",
    "Dashboard": "डॅशबोर्ड",
    "Logout": "लॉगआउट",
    "Maps": "नकाशे",
    "Group Orders": "गट ऑर्डर",
    "Market Rates": "बाजार दर",
    "Find Nearby": "जवळपास शोधा",
    
    // Dashboard
    "Food Vendor Dashboard": "फूड वेंडर डॅशबोर्ड",
    "Food Supplier Dashboard": "फूड सप्लायर डॅशबोर्ड",
    "Manage your food business, suppliers, and orders": "तुमचा फूड व्यवसाय, सप्लायर आणि ऑर्डर व्यवस्थापित करा",
    "Food Orders": "फूड ऑर्डर",
    "Nearby Food Suppliers": "जवळपासचे फूड सप्लायर",
    "Within 5km radius": "5 किमी त्रिज्येत",
    "Daily Revenue": "दैनिक कमाई",
    "Food Categories": "फूड श्रेणी",
    "Spices, vegetables, grains": "मसाले, भाज्या, धान्य",
    
    // Orders & Suppliers
    "Recent Food Orders": "अलीकडील फूड ऑर्डर",
    "Top Nearby Food Suppliers": "शीर्ष जवळपासचे फूड सप्लायर",
    "Bulk Food Orders": "मोठ्या प्रमाणात फूड ऑर्डर",
    "orders completed": "ऑर्डर पूर्ण केले",
    "Total spent": "एकूण खर्च",
    "participants": "सहभागी",
    "target": "लक्ष्य",
    "Deadline": "अंतिम मुदत",
    
    // Status
    "Preparing": "तयार करत आहे",
    "Delivered": "वितरित केले",
    "In Transit": "वाहतुकीत",
    "Processing": "प्रक्रिया करत आहे",
    "Shipped": "पाठवले",
    "Accepted": "स्वीकारले",
    "Pending": "प्रलंबित",
    "Completed": "पूर्ण",
    
    // Location & Geography
    "Your Location": "तुमचे स्थान",
    "Find Food Suppliers Near You": "तुमच्या जवळ फूड सप्लायर शोधा",
    "Discover local food suppliers and vendors across India": "भारतभर स्थानिक फूड सप्लायर आणि विक्रेते शोधा",
    "No recent orders in your area": "तुमच्या भागात अलीकडील ऑर्डर नाहीत",
    "No suppliers found nearby": "जवळपास कोणते सप्लायर सापडले नाहीत",
    "No bulk orders in your area": "तुमच्या भागात मोठ्या प्रमाणात ऑर्डर नाहीत"
  },
  
  ta: {
    // Navigation & Common
    "Home": "முகப்பு",
    "Login": "உள்நுழைவு",
    "Register": "பதிவு",
    "Dashboard": "டாஷ்போர்டு",
    "Logout": "வெளியேறு",
    "Maps": "வரைபடங்கள்",
    "Group Orders": "குழு ஆர்டர்கள்",
    "Market Rates": "சந்தை விலைகள்",
    "Find Nearby": "அருகில் கண்டறியவும்",
    
    // Dashboard
    "Food Vendor Dashboard": "உணவு விற்பனையாளர் டாஷ்போர்டு",
    "Food Supplier Dashboard": "உணவு சப்ளையர் டாஷ்போர்டு",
    "Manage your food business, suppliers, and orders": "உங்கள் உணவு வணிகம், சப்ளையர்கள் மற்றும் ஆர்டர்களை நிர்வகிக்கவும்",
    "Food Orders": "உணவு ஆர்டர்கள்",
    "Nearby Food Suppliers": "அருகிலுள்ள உணவு சப்ளையர்கள்",
    "Within 5km radius": "5 கிமீ சுற்றளவில்",
    "Daily Revenue": "தினசரி வருமானம்",
    "Food Categories": "உணவு வகைகள்",
    "Spices, vegetables, grains": "மசாலாப் பொருட்கள், காய்கறிகள், தானியங்கள்",
    
    // Orders & Suppliers
    "Recent Food Orders": "சமீபத்திய உணவு ஆர்டர்கள்",
    "Top Nearby Food Suppliers": "முதன்மை அருகிலுள்ள உணவு சப்ளையர்கள்",
    "Bulk Food Orders": "மொத்த உணவு ஆர்டர்கள்",
    "orders completed": "ஆர்டர்கள் முடிக்கப்பட்டன",
    "Total spent": "மொத்த செலவு",
    "participants": "பங்கேற்பாளர்கள்",
    "target": "இலக்கு",
    "Deadline": "கடைசி தேதி"
  },
  
  te: {
    // Navigation & Common
    "Home": "హోమ్",
    "Login": "లాగిన్",
    "Register": "రిజిస్టర్",
    "Dashboard": "డాష్‌బోర్డ్",
    "Logout": "లాగౌట్",
    "Maps": "మ్యాప్స్",
    "Group Orders": "గ్రూప్ ఆర్డర్లు",
    "Market Rates": "మార్కెట్ రేట్లు",
    "Find Nearby": "సమీపంలో కనుగొనండి",
    
    // Dashboard
    "Food Vendor Dashboard": "ఫుడ్ వెండర్ డాష్‌బోర్డ్",
    "Food Supplier Dashboard": "ఫుడ్ సప్లయర్ డాష్‌బోర్డ్",
    "Manage your food business, suppliers, and orders": "మీ ఫుడ్ వ్యాపారం, సప్లయర్లు మరియు ఆర్డర్లను నిర్వహించండి",
    "Food Orders": "ఫుడ్ ఆర్డర్లు",
    "Nearby Food Suppliers": "సమీపంలోని ఫుడ్ సప్లయర్లు",
    "Within 5km radius": "5 కిమీ వ్యాసార్థంలో",
    "Daily Revenue": "రోజువారీ ఆదాయం",
    "Food Categories": "ఫుడ్ వర్గాలు",
    "Spices, vegetables, grains": "మసాలాలు, కూరగాయలు, ధాన్యాలు"
  },
  
  gu: {
    // Navigation & Common
    "Home": "હોમ",
    "Login": "લોગિન",
    "Register": "રજિસ્ટર",
    "Dashboard": "ડેશબોર્ડ",
    "Logout": "લોગઆઉટ",
    "Maps": "નકશા",
    "Group Orders": "ગ્રુપ ઓર્ડર",
    "Market Rates": "માર્કેટ રેટ",
    "Find Nearby": "નજીકમાં શોધો",
    
    // Dashboard
    "Food Vendor Dashboard": "ફૂડ વેન્ડર ડેશબોર્ડ",
    "Food Supplier Dashboard": "ફૂડ સપ્લાયર ડેશબોર્ડ",
    "Manage your food business, suppliers, and orders": "તમારા ફૂડ બિઝનેસ, સપ્લાયર અને ઓર્ડરનું સંચાલન કરો",
    "Food Orders": "ફૂડ ઓર્ડર",
    "Nearby Food Suppliers": "નજીકના ફૂડ સપ્લાયર",
    "Within 5km radius": "5 કિમી ત્રિજ્યામાં",
    "Daily Revenue": "દૈનિક આવક",
    "Food Categories": "ફૂડ કેટેગરી",
    "Spices, vegetables, grains": "મસાલા, શાકભાજી, અનાજ"
  },
  
  ml: {
    // Navigation & Common
    "Home": "ഹോം",
    "Login": "ലോഗിൻ",
    "Register": "രജിസ്റ്റർ",
    "Dashboard": "ഡാഷ്‌ബോർഡ്",
    "Logout": "ലോഗൗട്ട്",
    "Maps": "മാപ്പുകൾ",
    "Group Orders": "ഗ്രൂപ്പ് ഓർഡറുകൾ",
    "Market Rates": "മാർക്കറ്റ് നിരക്കുകൾ",
    "Find Nearby": "സമീപത്ത് കണ്ടെത്തുക",
    
    // Dashboard
    "Food Vendor Dashboard": "ഫുഡ് വെണ്ടർ ഡാഷ്‌ബോർഡ്",
    "Food Supplier Dashboard": "ഫുഡ് സപ്ലയർ ഡാഷ്‌ബോർഡ്",
    "Manage your food business, suppliers, and orders": "നിങ്ങളുടെ ഫുഡ് ബിസിനസ്സ്, സപ്ലയർമാർ, ഓർഡറുകൾ എന്നിവ കൈകാര്യം ചെയ്യുക",
    "Food Orders": "ഫുഡ് ഓർഡറുകൾ",
    "Nearby Food Suppliers": "സമീപത്തുള്ള ഫുഡ് സപ്ലയർമാർ",
    "Within 5km radius": "5 കിലോമീറ്റർ ചുറ്റളവിൽ",
    "Daily Revenue": "ദൈനംദിന വരുമാനം",
    "Food Categories": "ഫുഡ് വിഭാഗങ്ങൾ",
    "Spices, vegetables, grains": "മസാലകൾ, പച്ചക്കറികൾ, ധാന്യങ്ങൾ"
  }
};

class TranslationService {
  constructor() {
    this.apiKey = process.env.REACT_APP_LIBRETRANSLATE_API_KEY;
    this.baseUrl = process.env.REACT_APP_LIBRETRANSLATE_URL || 'https://libretranslate.de/translate';
    this.cache = new Map();
    this.supportedLanguages = ['en', 'hi', 'mr', 'ta', 'te', 'gu', 'ml'];
    
    // LibreTranslate language mapping
    this.languageMapping = {
      'en': 'en',
      'hi': 'hi',
      'mr': 'mr', // Marathi
      'ta': 'ta', // Tamil
      'te': 'te', // Telugu
      'gu': 'gu', // Gujarati
      'ml': 'ml'  // Malayalam
    };
  }

  /**
   * Translate text using LibreTranslate API
   * @param {string} text - Text to translate
   * @param {string} targetLang - Target language code
   * @param {string} sourceLang - Source language code (default: 'en')
   * @returns {Promise<string>} Translated text
   */
  async translateText(text, targetLang, sourceLang = 'en') {
    // Return original text if same language
    if (sourceLang === targetLang) {
      return text;
    }

    // Check cache first
    const cacheKey = `${text}_${sourceLang}_${targetLang}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Try local translations first
    const localTranslation = this.getLocalTranslation(text, targetLang);
    if (localTranslation !== text) {
      this.cache.set(cacheKey, localTranslation);
      return localTranslation;
    }

    // Use LibreTranslate API if available
    if (this.baseUrl) {
      try {
        const sourceCode = this.languageMapping[sourceLang] || sourceLang;
        const targetCode = this.languageMapping[targetLang] || targetLang;

        const requestBody = {
          q: text,
          source: sourceCode,
          target: targetCode,
          format: 'text'
        };

        // Add API key if available
        if (this.apiKey) {
          requestBody.api_key = this.apiKey;
        }

        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error(`LibreTranslate API request failed: ${response.status}`);
        }

        const data = await response.json();
        const translatedText = data.translatedText;

        // Cache the result
        this.cache.set(cacheKey, translatedText);
        
        return translatedText;
      } catch (error) {
        console.warn('LibreTranslate API failed, falling back to local translations:', error);
        return localTranslation;
      }
    }

    return localTranslation;
  }

  /**
   * Get local translation as fallback
   * @param {string} text - Text to translate
   * @param {string} targetLang - Target language code
   * @returns {string} Translated text or original text
   */
  getLocalTranslation(text, targetLang) {
    try {
      // Access translations directly without hooks
      const currentLocale = localStorage.getItem('locale') || 'en';
      const targetLocale = targetLang || currentLocale;
      
      // If local translations are available, use them
      if (localTranslations && localTranslations[targetLocale] && localTranslations[targetLocale][text]) {
        return localTranslations[targetLocale][text];
      }
      
      // Return original text if no translation found
      return text;
    } catch (error) {
      console.warn('Local translation failed:', error);
      return text;
    }
  }

  /**
   * Translate multiple texts at once
   * @param {string[]} texts - Array of texts to translate
   * @param {string} targetLang - Target language code
   * @param {string} sourceLang - Source language code (default: 'en')
   * @returns {Promise<string[]>} Array of translated texts
   */
  async translateBatch(texts, targetLang, sourceLang = 'en') {
    // For batch translation, translate each text individually
    const translations = await Promise.all(
      texts.map(text => this.translateText(text, targetLang, sourceLang))
    );
    return translations;
  }

  /**
   * Detect language of given text
   * @param {string} text - Text to detect language for
   * @returns {Promise<string>} Detected language code
   */
  async detectLanguage(text) {
    try {
      const requestBody = {
        q: text
      };

      // Add API key if available
      if (this.apiKey) {
        requestBody.api_key = this.apiKey;
      }

      const response = await fetch(`${this.baseUrl.replace('/translate', '/detect')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Language detection API request failed');
      }

      const data = await response.json();
      return data[0].language;
    } catch (error) {
      console.warn('Language detection failed:', error);
      return 'en';
    }
  }

  /**
   * Get supported languages
   * @returns {string[]} Array of supported language codes
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  /**
   * Clear translation cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get language name in native script
   * @param {string} langCode - Language code
   * @returns {string} Language name
   */
  getLanguageName(langCode) {
    const languageNames = {
      'en': 'English',
      'hi': 'हिंदी',
      'mr': 'मराठी',
      'ta': 'தமிழ்',
      'te': 'తెలుగు',
      'gu': 'ગુજરાતી',
      'ml': 'മലയാളം'
    };
    return languageNames[langCode] || langCode;
  }

  /**
   * Check if LibreTranslate API is available
   * @returns {Promise<boolean>} True if API is available
   */
  async isApiAvailable() {
    try {
      const response = await fetch(`${this.baseUrl.replace('/translate', '/languages')}`, {
        method: 'GET'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Create singleton instance
const translationService = new TranslationService();

export default translationService;

// Export individual functions for convenience
export const translateText = (text, targetLang, sourceLang) => 
  translationService.translateText(text, targetLang, sourceLang);

export const translateBatch = (texts, targetLang, sourceLang) => 
  translationService.translateBatch(texts, targetLang, sourceLang);

export const detectLanguage = (text) => 
  translationService.detectLanguage(text);

export const getSupportedLanguages = () => 
  translationService.getSupportedLanguages();

export const getLanguageName = (langCode) => 
  translationService.getLanguageName(langCode);

export const isApiAvailable = () => 
  translationService.isApiAvailable();