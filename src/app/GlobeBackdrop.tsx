'use client';

import { useEffect, useState } from 'react';
import { destroyGlobe, initGlobe } from './globe';

const GLOBE_BACKDROP_ID = 'app-globe-backdrop';
type GlobeMode = 'passive' | 'interactive' | 'hidden';

export default function GlobeBackdrop() {
  const [mode, setMode] = useState<GlobeMode>('passive');

  useEffect(() => {
    const handleModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: GlobeMode }>;
      const nextMode = customEvent.detail?.mode;

      if (nextMode) {
        setMode(nextMode);
      }
    };

    window.addEventListener('inaplanet-globe-mode', handleModeChange as EventListener);

    return () => {
      window.removeEventListener('inaplanet-globe-mode', handleModeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (mode === 'hidden') {
      destroyGlobe();
      return;
    }

    let retryCount = 0;
    let interval: number | undefined;
    let deferredBootHandle: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: (...args: unknown[]) => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const bootGlobe = () => {
      interval = window.setInterval(() => {
        const container = document.getElementById(GLOBE_BACKDROP_ID);

        if (container) {
          initGlobe(GLOBE_BACKDROP_ID);
          if (typeof interval === 'number') {
            window.clearInterval(interval);
            interval = undefined;
          }
        } else if (retryCount >= 10) {
          if (typeof interval === 'number') {
            window.clearInterval(interval);
            interval = undefined;
          }
        }

        retryCount += 1;
      }, 150);
    };

    if (idleWindow.requestIdleCallback) {
      deferredBootHandle = idleWindow.requestIdleCallback(() => {
        bootGlobe();
      }, { timeout: 500 });
    } else {
      deferredBootHandle = window.setTimeout(bootGlobe, 180);
    }

    return () => {
      if (typeof interval === 'number') {
        window.clearInterval(interval);
      }

      if (typeof deferredBootHandle === 'number') {
        if (idleWindow.cancelIdleCallback) {
          idleWindow.cancelIdleCallback(deferredBootHandle);
        } else {
          window.clearTimeout(deferredBootHandle);
        }
      }
    };
  }, [mode]);

  return (
    <div
      id={GLOBE_BACKDROP_ID}
      className={`app-globe-backdrop app-globe-backdrop--${mode}`}
      aria-hidden="true"
    />
  );
}
