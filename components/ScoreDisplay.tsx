import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScoreDisplay.module.css';

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [hasShownCongrats, setHasShownCongrats] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('Score changed:', score, 'Has shown congrats:', hasShownCongrats);
    
    // Show congratulations when score reaches 1 or more for the first time
    if (score >= 1 && !hasShownCongrats) {
      console.log('Showing congratulations popup');
      setShowCongratulations(true);
      setHasShownCongrats(true);
    }
  }, [score, hasShownCongrats]);

  const handleCloseCongratulations = () => {
    setShowCongratulations(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoEnd = () => {
    console.log('Video ended');
    handleCloseCongratulations();
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    handleCloseCongratulations();
  };

  return (
    <>
      <div className={styles.scoreDisplay}>
        Score: {score}
      </div>

      <AnimatePresence>
        {showCongratulations && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.congratsBackdrop}
              onClick={handleCloseCongratulations}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={styles.fullscreenVideoContainer}
            >
              <button 
                className={styles.closeButton}
                onClick={handleCloseCongratulations}
              >
                ×
              </button>
              
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                playsInline
                className={styles.fullscreenVideo}
                onEnded={handleVideoEnd}
                onError={handleVideoError}
                onLoadStart={() => console.log('Video loading started')}
                onLoadedData={() => console.log('Video loaded')}
                onCanPlay={() => console.log('Video can play')}
              >
                <source src="/kk.mp4" type="video/mp4" />
                <source src="./kk.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScoreDisplay;