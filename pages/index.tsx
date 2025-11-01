'use client';

import React, { useState, useEffect, useRef } from 'react';
import RiddleDisplay from '../components/RiddleDisplay';
import InsultOverlay from '../components/InsultOverlay';
import LanguageToggle from '../components/LanguageToggle';
import ScoreDisplay from '../components/ScoreDisplay';
import { riddlesEnglish, riddlesAmharic } from '../utils/riddles';
import styles from './Home.module.css';

const insults = [
  "Bruh… even a chicken could do better.",
  "You brought shame upon your kebele.",
  "Your ancestors are disappointed but not surprised.",
  "Try again, Einstein.",
  "You missed? Wow. You must be premium stupid.",
  "Injera 1 – You 0.",
  "Even the donkey gave up watching you.",
  "If failing was an Olympic sport, you'd get gold.",
];

const randomCompliments = [
  "You're trash… but at least you look consistent.",
];

export default function Home() {
  const [language, setLanguage] = useState<'english' | 'amharic'>('english');
  const [riddles, setRiddles] = useState(riddlesEnglish);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [insult, setInsult] = useState<{ text: string; isExplode: boolean } | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    setRiddles(language === 'english' ? riddlesEnglish : riddlesAmharic);
    if (isMounted.current) {
      setCurrentRiddleIndex(Math.floor(Math.random() * riddles.length));
    } else {
      isMounted.current = true;
    }
  }, [language, riddles.length]);

  const handleCorrect = () => {
    const newScore = score + 1;
    console.log('Correct answer! New score:', newScore);
    setScore(newScore);
    setCurrentRiddleIndex(Math.floor(Math.random() * riddles.length));
  };

  const handleWrong = () => {
    let selectedText = insults[Math.floor(Math.random() * insults.length)];
    if (Math.random() < 0.1) selectedText = randomCompliments[Math.floor(Math.random() * randomCompliments.length)];
    if (Math.random() < 0.05) selectedText += ' YEET!';
    const isExplode = Math.random() < 0.05;
    setInsult({ text: selectedText, isExplode });
  };

  const handleRetry = () => {
    setInsult(null);
    setScore(0);
    setCurrentRiddleIndex(Math.floor(Math.random() * riddles.length));
  };

  const currentRiddle = riddles[currentRiddleIndex];

  return (
    <main className={styles.mainContainer}>
      {!insult && (
        <div className={styles.riddleWrapper}>
          <RiddleDisplay
            riddle={currentRiddle.riddle}
            answer={currentRiddle.answer}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            language={language}
          />
        </div>
      )}

      <div className={styles.scoreContainer}>
        <ScoreDisplay score={score} />
      </div>

      <div className={styles.languageContainer}>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      {insult && (
        <InsultOverlay
          insult={insult.text}
          isExplode={insult.isExplode}
          onRetry={handleRetry}
          language={language}
        />
      )}
    </main>
  );
}