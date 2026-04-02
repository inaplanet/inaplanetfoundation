import { useEffect, useRef, useState } from 'react';

export function useDeferredLanguageFont<T extends string>(initialLanguage: T) {
  const [language, setLanguage] = useState<T>(initialLanguage);
  const [renderedLanguage, setRenderedLanguage] = useState<T>(initialLanguage);
  const [renderedFontLanguage, setRenderedFontLanguage] = useState<T>(initialLanguage);
  const [isLanguageReady, setIsLanguageReady] = useState(true);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    setLanguage(initialLanguage);
    setRenderedLanguage(initialLanguage);
    setRenderedFontLanguage(initialLanguage);
    setIsLanguageReady(true);
  }, [initialLanguage]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    let isCancelled = false;
    let revealFrameOne: number | undefined;
    let revealFrameTwo: number | undefined;
    const fontSet = typeof document !== 'undefined' ? document.fonts : null;
    const fontFamily = language === 'en' ? 'Orbitron' : 'Secondary UI';

    const revealLanguage = () => {
      if (isCancelled) {
        return;
      }

      setRenderedFontLanguage(language);

      revealFrameOne = window.requestAnimationFrame(() => {
        if (isCancelled) {
          return;
        }

        setRenderedLanguage(language);

        revealFrameTwo = window.requestAnimationFrame(() => {
          if (!isCancelled) {
            setIsLanguageReady(true);
          }
        });
      });
    };

    setIsLanguageReady(false);

    if (!fontSet?.load) {
      revealLanguage();

      return () => {
        isCancelled = true;
      };
    }

    Promise.all([
      fontSet.load(`400 16px "${fontFamily}"`),
      fontSet.load(`700 16px "${fontFamily}"`),
    ])
      .catch(() => undefined)
      .finally(revealLanguage);

    return () => {
      isCancelled = true;

      if (typeof revealFrameOne === 'number') {
        window.cancelAnimationFrame(revealFrameOne);
      }

      if (typeof revealFrameTwo === 'number') {
        window.cancelAnimationFrame(revealFrameTwo);
      }
    };
  }, [language]);

  return {
    language,
    setLanguage,
    renderedLanguage,
    renderedFontLanguage,
    isLanguageReady,
  };
}
