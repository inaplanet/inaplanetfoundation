'use client';

import { memo, useEffect, useState } from 'react';

const DEFAULT_GREETINGS = [
  'Salam',
  'Merhaba',
  'Privet',
  'Hello',
  'Ciao',
  'Ni Hao',
  'Hola',
  'Bonjour',
  'Namaste',
  'Xin Chao',
  'Neih Hou',
  'Jambo',
  'Pryvit',
  'Oi',
] as const;

type GreetingTypewriterProps = {
  greetings?: readonly string[];
};

function GreetingTypewriter({ greetings = DEFAULT_GREETINGS }: GreetingTypewriterProps) {
  const [activeGreetingIndex, setActiveGreetingIndex] = useState(0);
  const [animatedGreeting, setAnimatedGreeting] = useState('');
  const [isDeletingGreeting, setIsDeletingGreeting] = useState(false);
  const [announcedGreeting, setAnnouncedGreeting] = useState('');

  useEffect(() => {
    const currentGreeting = greetings[activeGreetingIndex] ?? '';
    const normalizedGreeting = animatedGreeting === '\u00A0' ? '' : animatedGreeting;
    const reachedEnd = normalizedGreeting === currentGreeting;
    const reachedStart = normalizedGreeting.length === 0;

    const timeout = window.setTimeout(() => {
      if (!isDeletingGreeting) {
        if (reachedEnd) {
          setAnnouncedGreeting(currentGreeting);
          setIsDeletingGreeting(true);
          return;
        }

        setAnimatedGreeting(currentGreeting.slice(0, normalizedGreeting.length + 1));
        return;
      }

      if (!reachedStart) {
        const nextGreeting = currentGreeting.slice(0, normalizedGreeting.length - 1);
        setAnimatedGreeting(nextGreeting || '\u00A0');
        return;
      }

      setIsDeletingGreeting(false);
      setActiveGreetingIndex((currentIndex) => (currentIndex + 1) % greetings.length);
    }, reachedEnd && !isDeletingGreeting ? 900 : isDeletingGreeting ? 170 : 310);

    return () => window.clearTimeout(timeout);
  }, [activeGreetingIndex, animatedGreeting, greetings, isDeletingGreeting]);

  return (
    <>
      <div className="landing-showcase__greeting-typewriter" aria-hidden="true">
        <span>{animatedGreeting}</span>
        <span className="landing-showcase__greeting-caret" aria-hidden="true"></span>
      </div>
      <span className="landing-showcase__sr-only" aria-live="polite" aria-atomic="true">
        {announcedGreeting}
      </span>
    </>
  );
}

export default memo(GreetingTypewriter);
