import './globals.css';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import ConsoleNoiseFilter from './ConsoleNoiseFilter';
import GlobeBackdrop from './GlobeBackdrop';
import MobileCursorOverlay from './MobileCursorOverlay';

const orbitronFont = localFont({
  src: './fonts/Orbitron.ttf',
  variable: '--font-orbitron',
  display: 'swap',
});

const secondaryFont = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-secondary',
  display: 'swap',
  weight: '100 900',
});

const earlyConsoleNoiseFilter = `
(() => {
  const noisyPatterns = [
    'SES Removing unpermitted intrinsics',
    'Removing intrinsics.%MapPrototype%.getOrInsert',
    'Removing intrinsics.%MapPrototype%.getOrInsertComputed',
    'Removing intrinsics.%WeakMapPrototype%.getOrInsert',
    'Removing intrinsics.%WeakMapPrototype%.getOrInsertComputed',
    'Removing intrinsics.%DatePrototype%.toTemporalInstant',
    'lockdown-install.js'
  ];

  const shouldSuppress = (args) => {
    const message = args.map((value) => {
      if (typeof value === 'string') return value;
      try { return JSON.stringify(value); }
      catch (_error) { return String(value); }
    }).join(' ');

    return noisyPatterns.some((pattern) => message.includes(pattern));
  };

  const originalWarn = console.warn;
  const originalError = console.error;
  const originalLog = console.log;
  const originalInfo = console.info;

  console.warn = (...args) => {
    if (shouldSuppress(args)) return;
    originalWarn(...args);
  };

  console.error = (...args) => {
    if (shouldSuppress(args)) return;
    originalError(...args);
  };

  console.log = (...args) => {
    if (shouldSuppress(args)) return;
    originalLog(...args);
  };

  console.info = (...args) => {
    if (shouldSuppress(args)) return;
    originalInfo(...args);
  };
})();
`;

type AppShellProps = {
  children: ReactNode;
  lang: string;
};

export default function AppShell({ children, lang }: AppShellProps) {
  return (
    <html lang={lang} className={`${orbitronFont.variable} ${secondaryFont.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://cdn.cursors-4u.net/cursors/animated/the-alien-link-select-2fa53604-32.css" />
        <link rel="icon" href="/favicon.ico" sizes="256x256" />
        <script dangerouslySetInnerHTML={{ __html: earlyConsoleNoiseFilter }} />
      </head>
      <body>
        <GlobeBackdrop />
        <ConsoleNoiseFilter />
        <MobileCursorOverlay />
        {children}
      </body>
    </html>
  );
}
