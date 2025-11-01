import React from 'react';
import { motion } from 'framer-motion';
import styles from './InsultOverlay.module.css';

const InsultOverlay: React.FC<{
  insult: string;
  isExplode: boolean;
  onRetry: () => void;
  language: 'english' | 'amharic';
}> = ({ insult, isExplode, onRetry, language }) => {
  const ethiopianImages = [
    '/1.jpg',
    '/2.jpg', 
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
  ];

  // Amharic insults that match the English ones
  const amharicInsults = [
    "ብሩህ... ዳግም እንኳን ዶሮ ይበልጥሃል።",
    "በቀበሌህ ስም አሳፍረሃል።",
    "አባቶችህ ተስፋ ቆረጡ ግን አልደነገጡም።",
    "እንደ አይንስታይን እንደገና ሞክር።",
    "አላማህን አላገኘህም? ዋ ፍጹም ሞኝ ነህ።",
    "እንጀራ 1 - አንተ 0።",
    "አህያ እንኳን እርስዎን ለማየት ተስፋ ቆረጠች።",
    "ማለት ኦሎምፒክ ስፖርት ከሆነ ወርቅ ትሸረዋለህ።"
  ];

  const randomComplimentsAmharic = [
    "አንተ ቆሻሻ ነህ... ግን ቢያንስ በትክክል ታመሰልሃለህ።",
  ];

  const randomImage = ethiopianImages[Math.floor(Math.random() * ethiopianImages.length)];

  // Check if mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Function to get Amharic equivalent of the insult
  const getAmharicInsult = (englishInsult: string): string => {
    const englishInsults = [
      "Bruh… even a chicken could do better.",
      "You brought shame upon your kebele.",
      "Your ancestors are disappointed but not surprised.",
      "Try again, Einstein.",
      "You missed? Wow. You must be premium stupid.",
      "Injera 1 – You 0.",
      "Even the donkey gave up watching you.",
      "If failing was an Olympic sport, you'd get gold.",
    ];

    // Find the index of the matching English insult
    const index = englishInsults.findIndex(ins => 
      englishInsult.toLowerCase().includes(ins.toLowerCase().substring(0, 15))
    );

    if (index !== -1) {
      let amharicInsult = amharicInsults[index];
      
      // Add YEET! equivalent if present
      if (englishInsult.includes('YEET!')) {
        amharicInsult += ' ይት!';
      }
      
      return amharicInsult;
    }

    // Handle compliments
    if (englishInsult.includes("You're trash… but at least you look consistent.")) {
      return randomComplimentsAmharic[0];
    }

    // Fallback to original if no match found
    return englishInsult;
  };

  const displayInsult = language === 'amharic' ? getAmharicInsult(insult) : insult;
  const retryText = language === 'amharic' ? 'እንደገና ሞኝር' : 'Try Again';
  const explodeText = language === 'amharic' ? 'አልተሳካም 💥' : 'FAIL 💥';

  return (
    <>
      <div className={styles.backdrop} onClick={onRetry} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: isMobile ? -50 : 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: isMobile ? -50 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={styles.popupContainer}
      >
        <span 
          className={styles.popupClose} 
          onClick={onRetry}
          role="button"
          aria-label="Close overlay"
        >
          ×
        </span>
        
        <div className={styles.imageContainer}>
          <motion.img
            src={randomImage}
            alt="Ethiopian cultural background"
            className={`${styles.ethiopianImage} ${styles.imageTransition}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          
          <div className={styles.insultOverlay}>
            <motion.h2
              className={`${styles.popupText} ${language === 'amharic' ? styles.amharicText : ''}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {displayInsult}
            </motion.h2>

            {isExplode && (
              <motion.div
                className={styles.popupExplode}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.8, 1.2], opacity: [1, 1, 0] }}
                transition={{ duration: 1.2, times: [0, 0.6, 1] }}
              >
                {explodeText}
              </motion.div>
            )}

            <motion.button
              onClick={onRetry}
              className={styles.retryBtn}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {retryText} 🇪🇹
            </motion.button>
          </div>
        </div>
        
        <div className={styles.ethiopianFlagBorder} />
      </motion.div>
    </>
  );
};

export default InsultOverlay;