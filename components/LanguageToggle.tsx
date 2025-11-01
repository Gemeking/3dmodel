import React from 'react';
import styles from './LanguageToggle.module.css';

const LanguageToggle: React.FC<{
  language: string;
  setLanguage: (lang: 'english' | 'amharic') => void;
}> = ({ language, setLanguage }) => {
  return (
    <div className={styles.languageToggle}>
      <button
        onClick={() => setLanguage(language === 'english' ? 'amharic' : 'english')}
        className={styles.languageButton}
      >
        {language === 'english' ? 'Switch to Amharic' : 'Switch to English'}
      </button>
    </div>
  );
};

export default LanguageToggle;
