import { useState, useEffect } from 'react';

// Simple translation system that actually works
const translations = {
  en: {
    // Navigation
    "Food Bazaar": "Food Bazaar",
    "Home": "Home",
    "Login": "Login",
    "Register": "Register",
    "Dashboard": "Dashboard",
    "Group Orders": "Group Orders",
    "Maps": "Maps",
    "Logout": "Logout",
    "Welcome, {{name}}!": "Welcome, {{name}}!",

    // Home Page
    "Street Food Vendor Marketplace": "Street Food Vendor Marketplace",
    "Connect with local food suppliers and street vendors across India": "Connect with local food suppliers and street vendors across India",
    "Welcome to Marketplace": "Welcome to Marketplace",
    "Connect vendors and suppliers in one platform": "Connect vendors and suppliers in one platform",
    "Welcome back, {{name}}!": "Welcome back, {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "You're logged in as a {{userType}} from {{company}}",
    "Go to Dashboard": "Go to Dashboard",
    "For Food Vendors": "For Food Vendors",
    "For Food Suppliers": "For Food Suppliers",
    "Street Food Vendors": "Street Food Vendors",
    "Food Suppliers": "Food Suppliers",
    "Bulk Food Orders": "Bulk Food Orders",
    "Get Started as Vendor": "Get Started as Vendor",
    "Get Started as Supplier": "Get Started as Supplier",

    // Authentication
    "Sign In": "Sign In",
    "Create Account": "Create Account",
    "Email": "Email",
    "Password": "Password",
    "Full Name": "Full Name",
    "Company Name": "Company Name",
    "I am a": "I am a",
    "Vendor": "Vendor",
    "Supplier": "Supplier",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "Find reliable suppliers and manage your inventory efficiently",
    "Showcase your products and connect with potential buyers": "Showcase your products and connect with potential buyers",
    "Join forces with other vendors for bulk purchasing power": "Join forces with other vendors for bulk purchasing power",
    "Better Prices": "Better Prices",
    "Get volume discounts through collective buying": "Get volume discounts through collective buying",
    "Faster Delivery": "Faster Delivery",
    "Suppliers prioritize larger combined orders": "Suppliers prioritize larger combined orders",
    "Network Building": "Network Building",
    "Connect with other vendors in your industry": "Connect with other vendors in your industry",
    "Explore Group Orders": "Explore Group Orders",
    "Login to Join Group Orders": "Login to Join Group Orders",

    // Dashboard & Forms
    "Vendor Dashboard": "Vendor Dashboard",
    "Supplier Dashboard": "Supplier Dashboard",
    "Manage your orders, suppliers, and inventory": "Manage your orders, suppliers, and inventory",
    "Active Orders": "Active Orders",
    "Total Suppliers": "Total Suppliers",
    "Revenue": "Revenue",
    "Recent Orders": "Recent Orders",
    "Top Suppliers": "Top Suppliers",
    "Browse Group Orders": "Browse Group Orders",
    "Create Group Order": "Create Group Order",
    "Don't have an account?": "Don't have an account?",
    "Sign up": "Sign up",
    "Already have an account?": "Already have an account?",
    "Sign in": "Sign in",
    "Confirm Password": "Confirm Password",
    "Passwords do not match": "Passwords do not match",
    "Creating Account...": "Creating Account...",
    "Signing In...": "Signing In...",
    "Demo Accounts:": "Demo Accounts:",
    "Use Vendor Demo": "Use Vendor Demo",
    "Use Supplier Demo": "Use Supplier Demo",

    // Group Orders
    "Join or create bulk purchase orders with other vendors": "Join or create bulk purchase orders with other vendors",
    "All Orders": "All Orders",
    "My Orders": "My Orders",
    "Joined": "Joined",
    "Active": "Active",
    "Title": "Title",
    "Product Name": "Product Name",
    "Description": "Description",
    "Product Category": "Product Category",
    "Select Category": "Select Category",
    "Office Supplies": "Office Supplies",
    "Electronics": "Electronics",
    "Industrial": "Industrial",
    "Food & Beverage": "Food & Beverage",
    "Other": "Other",
    "Quantity Needed": "Quantity Needed",
    "Target Price": "Target Price",
    "Min Quantity": "Min Quantity",
    "Max Participants": "Max Participants",
    "Deadline": "Deadline",
    "Cancel": "Cancel",
    "Create Order": "Create Order",
    "No group orders found": "No group orders found",
    "Be the first to create a group order!": "Be the first to create a group order!",
    "Try changing your filter or create a new order.": "Try changing your filter or create a new order.",

    // Indian Street Vendor Theme
    "Street Vendor Marketplace": "Street Vendor Marketplace",
    "Connect with local suppliers and vendors across India": "Connect with local suppliers and vendors across India",
    "Join the Street Vendor Marketplace": "Join the Street Vendor Marketplace",
    "Bazaar": "Bazaar",
    "Mandi Prices": "Mandi Prices",
    "Live Market Rates": "Live Market Rates",
    "Wholesale Market": "Wholesale Market",
    "Local Suppliers": "Local Suppliers",
    "Street Vendors": "Street Vendors",
    "Bulk Orders": "Bulk Orders",
    "Market Location": "Market Location",
    "Price per Kg": "Price per Kg",
    "Price per Unit": "Price per Unit",
    "Minimum Order": "Minimum Order",
    "Real-time commodity prices from Indian mandis": "Real-time commodity prices from Indian mandis",
    "View All Mandi Prices": "View All Mandi Prices",
    "Textiles": "Textiles",

    // Maps & Location
    "Indian Street Vendor Locations": "Indian Street Vendor Locations",
    "Select a city to view local vendors and markets": "Select a city to view local vendors and markets",
    "India Street Vendor Network": "India Street Vendor Network",
    "Click on cities below to explore local markets": "Click on cities below to explore local markets",
    "Active Vendors": "Active Vendors",
    "Coordinates": "Coordinates",
    "Popular Markets": "Popular Markets",
    "Find local suppliers and street vendors across India": "Find local suppliers and street vendors across India",
    "Loading Indian street vendor locations...": "Loading Indian street vendor locations...",
    "Category Filters": "Category Filters",
    "All Categories": "All Categories",
    "Food & Spices": "Food & Spices",
    "Selected City": "Selected City",
    "Local Suppliers": "Local Suppliers",
    "Contact Supplier": "Contact Supplier",
    "No suppliers found": "No suppliers found",
    "Try selecting a different category or location": "Try selecting a different category or location",
    "Loading India Street Vendor Network": "Loading India Street Vendor Network",
    "Powered by MapMyIndia": "Powered by MapMyIndia",
    "India": "India",
    "My Location": "My Location",
    "Market Location": "Market Location",
    "Popular Markets": "Popular Markets",
    "Selected Location": "Selected Location",
    "This helps other vendors find orders in their area": "This helps other vendors find orders in their area",
    
    // Street Food Specific
    "Street Food Vendor Marketplace": "Street Food Vendor Marketplace",
    "Connect with local food suppliers and street vendors across India": "Connect with local food suppliers and street vendors across India",
    "Get Started as Food Vendor": "Get Started as Food Vendor",
    "Get Started as Food Supplier": "Get Started as Food Supplier",
    "Find reliable food suppliers and manage your food inventory efficiently": "Find reliable food suppliers and manage your food inventory efficiently",
    "Showcase your food products and connect with street food vendors": "Showcase your food products and connect with street food vendors",
    "Join forces with other food vendors for bulk purchasing power": "Join forces with other food vendors for bulk purchasing power",
    "Street Food Categories": "Street Food Categories",
    "Street Snacks": "Street Snacks",
    "Mumbai Street Food": "Mumbai Street Food",
    "South Indian": "South Indian",
    "Regional Specialties": "Regional Specialties",
    "Rating": "Rating",
    "Price Range": "Price Range",
    "Open Hours": "Open Hours",
    "Specialties": "Specialties",
    "Street Food Vendor Locations": "Street Food Vendor Locations",
    "Discover authentic street food vendors across India": "Discover authentic street food vendors across India",
    "Street Food Vendors": "Street Food Vendors",
    "Visit Food Stall": "Visit Food Stall",
    "No food vendors found": "No food vendors found",
    "Try selecting a different food category": "Try selecting a different food category",
    "food vendors found": "food vendors found"
  },

  hi: {
    // Navigation
    "Home": "होम",
    "Login": "लॉगिन",
    "Register": "रजिस्टर",
    "Dashboard": "डैशबोर्ड",
    "Group Orders": "समूह ऑर्डर",
    "Maps": "मैप्स",
    "Logout": "लॉगआउट",
    "Welcome, {{name}}!": "स्वागत है, {{name}}!",

    // Home Page
    "Welcome to Marketplace": "मार्केटप्लेस में आपका स्वागत है",
    "Connect vendors and suppliers in one platform": "एक प्लेटफॉर्म में विक्रेताओं और आपूर्तिकर्ताओं को जोड़ें",
    "Welcome back, {{name}}!": "वापसी पर स्वागत है, {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "आप {{company}} से {{userType}} के रूप में लॉग इन हैं",
    "Go to Dashboard": "डैशबोर्ड पर जाएं",
    "For Vendors": "विक्रेताओं के लिए",
    "For Suppliers": "आपूर्तिकर्ताओं के लिए",
    "Get Started as Vendor": "विक्रेता के रूप में शुरुआत करें",
    "Get Started as Supplier": "आपूर्तिकर्ता के रूप में शुरुआत करें",

    // Authentication
    "Sign In": "साइन इन",
    "Create Account": "खाता बनाएं",
    "Email": "ईमेल",
    "Password": "पासवर्ड",
    "Full Name": "पूरा नाम",
    "Company Name": "कंपनी का नाम",
    "I am a": "मैं हूं",
    "Vendor": "विक्रेता",
    "Supplier": "आपूर्तिकर्ता",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "विश्वसनीय आपूर्तिकर्ता खोजें और अपनी इन्वेंटरी को कुशलता से प्रबंधित करें",
    "Showcase your products and connect with potential buyers": "अपने उत्पादों को प्रदर्शित करें और संभावित खरीदारों से जुड़ें",
    "Join forces with other vendors for bulk purchasing power": "थोक खरीदारी शक्ति के लिए अन्य विक्रेताओं के साथ मिलकर काम करें",
    "Better Prices": "बेहतर कीमतें",
    "Get volume discounts through collective buying": "सामूहिक खरीदारी के माध्यम से वॉल्यूम छूट प्राप्त करें",
    "Faster Delivery": "तेज़ डिलीवरी",
    "Suppliers prioritize larger combined orders": "आपूर्तिकर्ता बड़े संयुक्त ऑर्डर को प्राथमिकता देते हैं",
    "Network Building": "नेटवर्क निर्माण",
    "Connect with other vendors in your industry": "अपने उद्योग के अन्य विक्रेताओं से जुड़ें",
    "Explore Group Orders": "समूह ऑर्डर देखें",
    "Login to Join Group Orders": "समूह ऑर्डर में शामिल होने के लिए लॉगिन करें",

    // Street Food Specific
    "Food Bazaar": "फूड बाज़ार",
    "Street Food Vendor Marketplace": "स्ट्रीट फूड वेंडर मार्केटप्लेस",
    "Connect with local food suppliers and street vendors across India": "भारत भर के स्थानीय खाद्य आपूर्तिकर्ताओं और स्ट्रीट फूड वेंडर से जुड़ें",
    "Get Started as Food Vendor": "फूड वेंडर के रूप में शुरुआत करें",
    "Get Started as Food Supplier": "फूड सप्लायर के रूप में शुरुआत करें",
    "Find reliable food suppliers and manage your food inventory efficiently": "विश्वसनीय खाद्य आपूर्तिकर्ता खोजें और अपनी खाद्य इन्वेंटरी को कुशलता से प्रबंधित करें",
    "Showcase your food products and connect with street food vendors": "अपने खाद्य उत्पादों को प्रदर्शित करें और स्ट्रीट फूड वेंडर से जुड़ें",
    "Join forces with other food vendors for bulk purchasing power": "थोक खरीदारी शक्ति के लिए अन्य फूड वेंडर के साथ मिलकर काम करें",
    "Street Food Categories": "स्ट्रीट फूड श्रेणियां",
    "Street Snacks": "स्ट्रीट स्नैक्स",
    "Mumbai Street Food": "मुंबई स्ट्रीट फूड",
    "South Indian": "दक्षिण भारतीय",
    "Regional Specialties": "क्षेत्रीय विशेषताएं",
    "Rating": "रेटिंग",
    "Price Range": "मूल्य सीमा",
    "Open Hours": "खुले घंटे",
    "Specialties": "विशेषताएं",
    "Street Food Vendor Locations": "स्ट्रीट फूड वेंडर स्थान",
    "Discover authentic street food vendors across India": "भारत भर में प्रामाणिक स्ट्रीट फूड वेंडर खोजें",
    "Street Food Vendors": "स्ट्रीट फूड वेंडर",
    "Visit Food Stall": "फूड स्टॉल पर जाएं",
    "No food vendors found": "कोई फूड वेंडर नहीं मिला",
    "Try selecting a different food category": "एक अलग फूड श्रेणी का चयन करने का प्रयास करें",
    "food vendors found": "फूड वेंडर मिले",

    // Dashboard & Forms
    "Vendor Dashboard": "विक्रेता डैशबोर्ड",
    "Supplier Dashboard": "आपूर्तिकर्ता डैशबोर्ड",
    "Manage your orders, suppliers, and inventory": "अपने ऑर्डर, आपूर्तिकर्ता और इन्वेंटरी का प्रबंधन करें",
    "Active Orders": "सक्रिय ऑर्डर",
    "Total Suppliers": "कुल आपूर्तिकर्ता",
    "Revenue": "राजस्व",
    "Recent Orders": "हाल के ऑर्डर",
    "Top Suppliers": "शीर्ष आपूर्तिकर्ता",
    "Browse Group Orders": "समूह ऑर्डर ब्राउज़ करें",
    "Create Group Order": "समूह ऑर्डर बनाएं",
    "Don't have an account?": "खाता नहीं है?",
    "Sign up": "साइन अप करें",
    "Already have an account?": "पहले से खाता है?",
    "Sign in": "साइन इन करें",
    "Confirm Password": "पासवर्ड की पुष्टि करें",
    "Passwords do not match": "पासवर्ड मेल नहीं खाते",
    "Creating Account...": "खाता बनाया जा रहा है...",
    "Signing In...": "साइन इन हो रहे हैं...",
    "Demo Accounts:": "डेमो खाते:",
    "Use Vendor Demo": "विक्रेता डेमो का उपयोग करें",
    "Use Supplier Demo": "आपूर्तिकर्ता डेमो का उपयोग करें",

    // Group Orders
    "Join or create bulk purchase orders with other vendors": "अन्य विक्रेताओं के साथ थोक खरीदारी ऑर्डर में शामिल हों या बनाएं",
    "All Orders": "सभी ऑर्डर",
    "My Orders": "मेरे ऑर्डर",
    "Joined": "शामिल हुए",
    "Active": "सक्रिय",
    "Title": "शीर्षक",
    "Product Name": "उत्पाद का नाम",
    "Description": "विवरण",
    "Product Category": "उत्पाद श्रेणी",
    "Select Category": "श्रेणी चुनें",
    "Office Supplies": "कार्यालय की आपूर्ति",
    "Electronics": "इलेक्ट्रॉनिक्स",
    "Industrial": "औद्योगिक",
    "Food & Beverage": "खाद्य और पेय",
    "Other": "अन्य",
    "Quantity Needed": "आवश्यक मात्रा",
    "Target Price": "लक्षित मूल्य",
    "Min Quantity": "न्यूनतम मात्रा",
    "Max Participants": "अधिकतम प्रतिभागी",
    "Deadline": "समय सीमा",
    "Cancel": "रद्द करें",
    "Create Order": "ऑर्डर बनाएं",
    "No group orders found": "कोई समूह ऑर्डर नहीं मिला",
    "Be the first to create a group order!": "समूह ऑर्डर बनाने वाले पहले व्यक्ति बनें!",
    "Try changing your filter or create a new order.": "अपना फिल्टर बदलने का प्रयास करें या नया ऑर्डर बनाएं।",

    // Indian Street Vendor Theme
    "Street Vendor Marketplace": "स्ट्रीट वेंडर मार्केटप्लेस",
    "Connect with local suppliers and vendors across India": "भारत भर के स्थानीय आपूर्तिकर्ताओं और विक्रेताओं से जुड़ें",
    "Join the Street Vendor Marketplace": "स्ट्रीट वेंडर मार्केटप्लेस में शामिल हों",
    "Bazaar": "बाज़ार",
    "Mandi Prices": "मंडी भाव",
    "Live Market Rates": "लाइव बाज़ार दरें",
    "Wholesale Market": "थोक बाज़ार",
    "Local Suppliers": "स्थानीय आपूर्तिकर्ता",
    "Street Vendors": "स्ट्रीट वेंडर",
    "Bulk Orders": "थोक ऑर्डर",
    "Market Location": "बाज़ार स्थान",
    "Price per Kg": "प्रति किलो मूल्य",
    "Price per Unit": "प्रति यूनिट मूल्य",
    "Minimum Order": "न्यूनतम ऑर्डर",
    "Real-time commodity prices from Indian mandis": "भारतीय मंडियों से वास्तविक समय की कमोडिटी कीमतें",
    "View All Mandi Prices": "सभी मंडी भाव देखें",
    "Textiles": "वस्त्र",

    // Maps & Location
    "Indian Street Vendor Locations": "भारतीय स्ट्रीट वेंडर स्थान",
    "Select a city to view local vendors and markets": "स्थानीय विक्रेताओं और बाज़ारों को देखने के लिए शहर चुनें",
    "India Street Vendor Network": "भारत स्ट्रीट वेंडर नेटवर्क",
    "Click on cities below to explore local markets": "स्थानीय बाज़ारों का पता लगाने के लिए नीचे शहरों पर क्लिक करें",
    "Active Vendors": "सक्रिय विक्रेता",
    "Coordinates": "निर्देशांक",
    "Popular Markets": "लोकप्रिय बाज़ार",
    "Find local suppliers and street vendors across India": "भारत भर में स्थानीय आपूर्तिकर्ता और स्ट्रीट वेंडर खोजें",
    "Loading Indian street vendor locations...": "भारतीय स्ट्रीट वेंडर स्थान लोड हो रहे हैं...",
    "Category Filters": "श्रेणी फिल्टर",
    "All Categories": "सभी श्रेणियां",
    "Food & Spices": "खाद्य और मसाले",
    "Selected City": "चयनित शहर",
    "Local Suppliers": "स्थानीय आपूर्तिकर्ता",
    "Contact Supplier": "आपूर्तिकर्ता से संपर्क करें",
    "No suppliers found": "कोई आपूर्तिकर्ता नहीं मिला",
    "Try selecting a different category or location": "एक अलग श्रेणी या स्थान का चयन करने का प्रयास करें",
    "Loading India Street Vendor Network": "भारत स्ट्रीट वेंडर नेटवर्क लोड हो रहा है",
    "Powered by MapMyIndia": "MapMyIndia द्वारा संचालित",
    "India": "भारत",
    "My Location": "मेरा स्थान",
    "Market Location": "बाज़ार स्थान",
    "Popular Markets": "लोकप्रिय बाज़ार",
    "Selected Location": "चयनित स्थान",
    "This helps other vendors find orders in their area": "यह अन्य विक्रेताओं को अपने क्षेत्र में ऑर्डर खोजने में मदद करता है"
  },

  mr: {
    // Navigation
    "Home": "होम",
    "Login": "लॉगिन",
    "Register": "नोंदणी",
    "Dashboard": "डॅशबोर्ड",
    "Group Orders": "गट ऑर्डर",
    "Maps": "नकाशे",
    "Logout": "लॉगआउट",
    "Welcome, {{name}}!": "स्वागत आहे, {{name}}!",

    // Home Page
    "Welcome to Marketplace": "मार्केटप्लेसमध्ये आपले स्वागत आहे",
    "Connect vendors and suppliers in one platform": "एका प्लॅटफॉर्मवर विक्रेते आणि पुरवठादार जोडा",
    "Welcome back, {{name}}!": "परत स्वागत आहे, {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "तुम्ही {{company}} मधून {{userType}} म्हणून लॉग इन आहात",
    "Go to Dashboard": "डॅशबोर्डवर जा",
    "For Vendors": "विक्रेत्यांसाठी",
    "For Suppliers": "पुरवठादारांसाठी",
    "Get Started as Vendor": "विक्रेता म्हणून सुरुवात करा",
    "Get Started as Supplier": "पुरवठादार म्हणून सुरुवात करा",

    // Authentication
    "Sign In": "साइन इन",
    "Create Account": "खाते तयार करा",
    "Email": "ईमेल",
    "Password": "पासवर्ड",
    "Full Name": "पूर्ण नाव",
    "Company Name": "कंपनीचे नाव",
    "I am a": "मी आहे",
    "Vendor": "विक्रेता",
    "Supplier": "पुरवठादार",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "विश्वसनीय पुरवठादार शोधा आणि तुमची इन्व्हेंटरी कार्यक्षमतेने व्यवस्थापित करा",
    "Showcase your products and connect with potential buyers": "तुमची उत्पादने दाखवा आणि संभाव्य खरेदीदारांशी जोडा",
    "Join forces with other vendors for bulk purchasing power": "मोठ्या प्रमाणात खरेदी शक्तीसाठी इतर विक्रेत्यांसह सामील व्हा",
    "Better Prices": "चांगल्या किंमती",
    "Get volume discounts through collective buying": "सामूहिक खरेदीद्वारे व्हॉल्यूम सूट मिळवा",
    "Faster Delivery": "जलद वितरण",
    "Suppliers prioritize larger combined orders": "पुरवठादार मोठ्या एकत्रित ऑर्डरला प्राधान्य देतात",
    "Network Building": "नेटवर्क निर्माण",
    "Connect with other vendors in your industry": "तुमच्या उद्योगातील इतर विक्रेत्यांशी जोडा",
    "Explore Group Orders": "गट ऑर्डर एक्सप्लोर करा",
    "Login to Join Group Orders": "गट ऑर्डरमध्ये सामील होण्यासाठी लॉगिन करा"
  },

  ta: {
    // Navigation
    "Home": "முகப்பு",
    "Login": "உள்நுழைவு",
    "Register": "பதிவு",
    "Dashboard": "டாஷ்போர்டு",
    "Group Orders": "குழு ஆர்டர்கள்",
    "Maps": "வரைபடங்கள்",
    "Logout": "வெளியேறு",
    "Welcome, {{name}}!": "வரவேற்கிறோம், {{name}}!",

    // Home Page
    "Welcome to Marketplace": "சந்தைக்கு வரவேற்கிறோம்",
    "Connect vendors and suppliers in one platform": "ஒரே தளத்தில் விற்பனையாளர்கள் மற்றும் சப்ளையர்களை இணைக்கவும்",
    "Welcome back, {{name}}!": "மீண்டும் வரவேற்கிறோம், {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "நீங்கள் {{company}} இலிருந்து {{userType}} ஆக உள்நுழைந்துள்ளீர்கள்",
    "Go to Dashboard": "டாஷ்போர்டுக்கு செல்லவும்",
    "For Vendors": "விற்பனையாளர்களுக்கு",
    "For Suppliers": "சப்ளையர்களுக்கு",
    "Get Started as Vendor": "விற்பனையாளராக தொடங்கவும்",
    "Get Started as Supplier": "சப்ளையராக தொடங்கவும்",

    // Authentication
    "Sign In": "உள்நுழைவு",
    "Create Account": "கணக்கு உருவாக்கவும்",
    "Email": "மின்னஞ்சல்",
    "Password": "கடவுச்சொல்",
    "Full Name": "முழு பெயர்",
    "Company Name": "நிறுவன பெயர்",
    "I am a": "நான் ஒரு",
    "Vendor": "விற்பனையாளர்",
    "Supplier": "சப்ளையர்",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "நம்பகமான சப்ளையர்களைக் கண்டறிந்து உங்கள் சரக்குகளை திறமையாக நிர்வகிக்கவும்",
    "Showcase your products and connect with potential buyers": "உங்கள் தயாரிப்புகளைக் காட்டி சாத்தியமான வாங்குபவர்களுடன் இணைக்கவும்",
    "Join forces with other vendors for bulk purchasing power": "மொத்த கொள்முதல் சக்திக்காக மற்ற விற்பனையாளர்களுடன் சேரவும்",
    "Better Prices": "சிறந்த விலைகள்",
    "Get volume discounts through collective buying": "கூட்டு வாங்குதல் மூலம் அளவு தள்ளுபடிகளைப் பெறுங்கள்",
    "Faster Delivery": "வேகமான டெலிவரி",
    "Suppliers prioritize larger combined orders": "சப்ளையர்கள் பெரிய ஒருங்கிணைந்த ஆர்டர்களுக்கு முன்னுரிமை அளிக்கிறார்கள்",
    "Network Building": "நெட்வொர்க் கட்டமைப்பு",
    "Connect with other vendors in your industry": "உங்கள் துறையில் உள்ள மற்ற விற்பனையாளர்களுடன் இணைக்கவும்",
    "Explore Group Orders": "குழு ஆர்டர்களை ஆராயுங்கள்",
    "Login to Join Group Orders": "குழு ஆர்டர்களில் சேர உள்நுழையவும்"
  },

  ml: {
    // Navigation
    "Home": "ഹോം",
    "Login": "ലോഗിൻ",
    "Register": "രജിസ്റ്റർ",
    "Dashboard": "ഡാഷ്‌ബോർഡ്",
    "Group Orders": "ഗ്രൂപ്പ് ഓർഡറുകൾ",
    "Maps": "മാപ്പുകൾ",
    "Logout": "ലോഗൗട്ട്",
    "Welcome, {{name}}!": "സ്വാഗതം, {{name}}!",

    // Home Page
    "Welcome to Marketplace": "മാർക്കറ്റ്‌പ്ലേസിലേക്ക് സ്വാഗതം",
    "Connect vendors and suppliers in one platform": "ഒരു പ്ലാറ്റ്‌ഫോമിൽ വെണ്ടർമാരെയും സപ്ലയർമാരെയും ബന്ധിപ്പിക്കുക",
    "Welcome back, {{name}}!": "തിരികെ സ്വാഗതം, {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "നിങ്ങൾ {{company}} ൽ നിന്ന് {{userType}} ആയി ലോഗിൻ ചെയ്തിരിക്കുന്നു",
    "Go to Dashboard": "ഡാഷ്‌ബോർഡിലേക്ക് പോകുക",
    "For Vendors": "വെണ്ടർമാർക്കായി",
    "For Suppliers": "സപ്ലയർമാർക്കായി",
    "Get Started as Vendor": "വെണ്ടർ ആയി ആരംഭിക്കുക",
    "Get Started as Supplier": "സപ്ലയർ ആയി ആരംഭിക്കുക",

    // Authentication
    "Sign In": "സൈൻ ഇൻ",
    "Create Account": "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    "Email": "ഇമെയിൽ",
    "Password": "പാസ്‌വേഡ്",
    "Full Name": "പൂർണ്ണ നാമം",
    "Company Name": "കമ്പനി നാമം",
    "I am a": "ഞാൻ ഒരു",
    "Vendor": "വെണ്ടർ",
    "Supplier": "സപ്ലയർ",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "വിശ്വസനീയമായ സപ്ലയർമാരെ കണ്ടെത്തുകയും നിങ്ങളുടെ ഇൻവെന്ററി കാര്യക്ഷമമായി കൈകാര്യം ചെയ്യുകയും ചെയ്യുക",
    "Showcase your products and connect with potential buyers": "നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ പ്രദർശിപ്പിക്കുകയും സാധ്യതയുള്ള വാങ്ങുന്നവരുമായി ബന്ധപ്പെടുകയും ചെയ്യുക",
    "Join forces with other vendors for bulk purchasing power": "ബൾക്ക് പർച്ചേസിംഗ് പവറിനായി മറ്റ് വെണ്ടർമാരുമായി ചേരുക",
    "Better Prices": "മികച്ച വിലകൾ",
    "Get volume discounts through collective buying": "കൂട്ടായ വാങ്ങലിലൂടെ വോളിയം ഡിസ്കൗണ്ടുകൾ നേടുക",
    "Faster Delivery": "വേഗത്തിലുള്ള ഡെലിവറി",
    "Suppliers prioritize larger combined orders": "സപ്ലയർമാർ വലിയ സംയുക്ത ഓർഡറുകൾക്ക് മുൻഗണന നൽകുന്നു",
    "Network Building": "നെറ്റ്‌വർക്ക് നിർമ്മാണം",
    "Connect with other vendors in your industry": "നിങ്ങളുടെ വ്യവസായത്തിലെ മറ്റ് വെണ്ടർമാരുമായി ബന്ധപ്പെടുക",
    "Explore Group Orders": "ഗ്രൂപ്പ് ഓർഡറുകൾ പര്യവേക്ഷണം ചെയ്യുക",
    "Login to Join Group Orders": "ഗ്രൂപ്പ് ഓർഡറുകളിൽ ചേരാൻ ലോഗിൻ ചെയ്യുക"
  },

  te: {
    // Navigation
    "Home": "హోమ్",
    "Login": "లాగిన్",
    "Register": "రిజిస్టర్",
    "Dashboard": "డాష్‌బోర్డ్",
    "Group Orders": "గ్రూప్ ఆర్డర్లు",
    "Maps": "మ్యాప్స్",
    "Logout": "లాగౌట్",
    "Welcome, {{name}}!": "స్వాగతం, {{name}}!",

    // Home Page
    "Welcome to Marketplace": "మార్కెట్‌ప్లేస్‌కు స్వాగతం",
    "Connect vendors and suppliers in one platform": "ఒక ప్లాట్‌ఫారమ్‌లో విక్రేతలు మరియు సరఫరాదారులను కనెక్ట్ చేయండి",
    "Welcome back, {{name}}!": "తిరిగి స్వాగతం, {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "మీరు {{company}} నుండి {{userType}} గా లాగిన్ అయ్యారు",
    "Go to Dashboard": "డాష్‌బోర్డ్‌కు వెళ్లండి",
    "For Vendors": "విక్రేతల కోసం",
    "For Suppliers": "సరఫరాదారుల కోసం",
    "Get Started as Vendor": "విక్రేతగా ప్రారంభించండి",
    "Get Started as Supplier": "సరఫరాదారుగా ప్రారంభించండి",

    // Authentication
    "Sign In": "సైన్ ఇన్",
    "Create Account": "ఖాతా సృష్టించండి",
    "Email": "ఇమెయిల్",
    "Password": "పాస్‌వర్డ్",
    "Full Name": "పూర్తి పేరు",
    "Company Name": "కంపెనీ పేరు",
    "I am a": "నేను ఒక",
    "Vendor": "విక్రేత",
    "Supplier": "సరఫరాదారు",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "విశ్వసనీయ సరఫరాదారులను కనుగొని మీ ఇన్వెంటరీని సమర్థవంతంగా నిర్వహించండి",
    "Showcase your products and connect with potential buyers": "మీ ఉత్పత్తులను ప్రదర్శించండి మరియు సంభావ్య కొనుగోలుదారులతో కనెక్ట్ అవ్వండి",
    "Join forces with other vendors for bulk purchasing power": "బల్క్ కొనుగోలు శక్తి కోసం ఇతర విక్రేతలతో చేతులు కలపండి",
    "Better Prices": "మెరుగైన ధరలు",
    "Get volume discounts through collective buying": "సామూహిక కొనుగోలు ద్వారా వాల్యూమ్ డిస్కౌంట్లు పొందండి",
    "Faster Delivery": "వేగవంతమైన డెలివరీ",
    "Suppliers prioritize larger combined orders": "సరఫరాదారులు పెద్ద సంయుక్త ఆర్డర్లకు ప్రాధాన్యత ఇస్తారు",
    "Network Building": "నెట్‌వర్క్ నిర్మాణం",
    "Connect with other vendors in your industry": "మీ పరిశ్రమలోని ఇతర విక్రేతలతో కనెక్ట్ అవ్వండి",
    "Explore Group Orders": "గ్రూప్ ఆర్డర్లను అన్వేషించండి",
    "Login to Join Group Orders": "గ్రూప్ ఆర్డర్లలో చేరడానికి లాగిన్ చేయండి"
  },

  gu: {
    // Navigation
    "Home": "હોમ",
    "Login": "લોગિન",
    "Register": "રજિસ્ટર",
    "Dashboard": "ડેશબોર્ડ",
    "Group Orders": "ગ્રુપ ઓર્ડર",
    "Maps": "નકશા",
    "Logout": "લોગઆઉટ",
    "Welcome, {{name}}!": "સ્વાગત છે, {{name}}!",

    // Home Page
    "Welcome to Marketplace": "માર્કેટપ્લેસમાં આપનું સ્વાગત છે",
    "Connect vendors and suppliers in one platform": "એક પ્લેટફોર્મમાં વિક્રેતાઓ અને સપ્લાયરોને જોડો",
    "Welcome back, {{name}}!": "પાછા સ્વાગત છે, {{name}}!",
    "You're logged in as a {{userType}} from {{company}}": "તમે {{company}} થી {{userType}} તરીકે લોગિન છો",
    "Go to Dashboard": "ડેશબોર્ડ પર જાઓ",
    "For Vendors": "વિક્રેતાઓ માટે",
    "For Suppliers": "સપ્લાયરો માટે",
    "Get Started as Vendor": "વિક્રેતા તરીકે શરૂ કરો",
    "Get Started as Supplier": "સપ્લાયર તરીકે શરૂ કરો",

    // Authentication
    "Sign In": "સાઇન ઇન",
    "Create Account": "ખાતું બનાવો",
    "Email": "ઇમેઇલ",
    "Password": "પાસવર્ડ",
    "Full Name": "પૂરું નામ",
    "Company Name": "કંપનીનું નામ",
    "I am a": "હું છું",
    "Vendor": "વિક્રેતા",
    "Supplier": "સપ્લાયર",

    // Home Page Additional Content
    "Find reliable suppliers and manage your inventory efficiently": "વિશ્વસનીય સપ્લાયરો શોધો અને તમારી ઇન્વેન્ટરીને કાર્યક્ષમ રીતે મેનેજ કરો",
    "Showcase your products and connect with potential buyers": "તમારા ઉત્પાદનો દર્શાવો અને સંભવિત ખરીદદારો સાથે જોડાઓ",
    "Join forces with other vendors for bulk purchasing power": "બલ્ક પર્ચેસિંગ પાવર માટે અન્ય વિક્રેતાઓ સાથે જોડાઓ",
    "Better Prices": "વધુ સારી કિંમતો",
    "Get volume discounts through collective buying": "સામૂહિક ખરીદી દ્વારા વોલ્યુમ ડિસ્કાઉન્ટ મેળવો",
    "Faster Delivery": "ઝડપી ડિલિવરી",
    "Suppliers prioritize larger combined orders": "સપ્લાયરો મોટા સંયુક્ત ઓર્ડરને પ્રાથમિકતા આપે છે",
    "Network Building": "નેટવર્ક બિલ્ડિંગ",
    "Connect with other vendors in your industry": "તમારા ઉદ્યોગના અન્ય વિક્રેતાઓ સાથે જોડાઓ",
    "Explore Group Orders": "ગ્રુપ ઓર્ડર એક્સપ્લોર કરો",
    "Login to Join Group Orders": "ગ્રુપ ઓર્ડરમાં જોડાવા માટે લોગિન કરો"
  }
};

export const useTranslation = () => {
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem('locale') || 'en'
  );

  const t = (key, params = {}) => {
    let translation = translations[currentLocale]?.[key] || translations.en[key] || key;
    
    // Ensure translation is a string
    if (typeof translation !== 'string') {
      translation = String(translation);
    }
    
    // Replace parameters in the translation using double curly braces
    Object.keys(params).forEach(param => {
      const regex = new RegExp(`{{${param}}}`, 'g');
      translation = translation.replace(regex, String(params[param] || ''));
    });
    
    return translation;
  };

  const changeLanguage = (locale) => {
    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
    // Force re-render
    window.dispatchEvent(new Event('languageChanged'));
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLocale(localStorage.getItem('locale') || 'en');
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return { t, currentLocale, changeLanguage };
};