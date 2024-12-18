import { WebSocketProvider } from './context/WebSocketContext'; // Adjust path accordingly
import ContextProvider from "../../context"; // Adjust path accordingly
import type { Metadata } from "next";
import './globals.css'

import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Krashbox│▌▌│▌▌ ▌ │▌ ▌ ▌│▌',
  description: 'Powered by Nossumus Foundation.'
};

// Define RootLayout
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check if we're in a server-side context before calling headers
  let cookies: string | null = null;
  if (typeof headers === 'function') {
    const serverHeaders = headers();
    cookies = serverHeaders?.get('cookie') || null;
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other head elements */}
      </head>
      <body>
        {/* <WebSocketProvider> */}
          {/* Wrap everything in the ContextProvider and pass cookies */}
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
        {/* </WebSocketProvider> */}
      </body>
    </html>
  );
}
