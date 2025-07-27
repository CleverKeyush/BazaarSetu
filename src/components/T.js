import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import translationService from '../services/translationService';

// Enhanced translation component with LibreTranslate API integration
const T = ({ children, ...props }) => {
  const { t, currentLocale } = useTranslation();
  const [dynamicTranslation, setDynamicTranslation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (typeof children === 'string' && currentLocale !== 'en') {
      // First try local translation from comprehensive translations
      const localTranslation = translationService.getLocalTranslation(children, currentLocale);
      
      // If local translation is same as original (not found), try LibreTranslate API
      if (localTranslation === children && process.env.REACT_APP_LIBRETRANSLATE_URL) {
        setIsLoading(true);
        translationService.translateText(children, currentLocale, 'en')
          .then(translated => {
            if (translated !== children) {
              setDynamicTranslation(translated);
            } else {
              // Fallback to hook-based translation
              setDynamicTranslation(t(children, props));
            }
          })
          .catch(error => {
            console.warn('LibreTranslate API failed, using local translation:', error);
            setDynamicTranslation(t(children, props));
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setDynamicTranslation(localTranslation !== children ? localTranslation : t(children, props));
      }
    } else {
      setDynamicTranslation(children);
    }
  }, [children, currentLocale, t, props]);
  
  if (typeof children === 'string') {
    try {
      // Show original text while loading (very brief)
      if (isLoading && currentLocale !== 'en') {
        return children;
      }
      
      // Priority: dynamicTranslation > local translation > original text
      return dynamicTranslation || t(children, props) || children;
    } catch (error) {
      console.warn('Translation error:', error);
      return children;
    }
  }
  
  return children;
};

export default T;