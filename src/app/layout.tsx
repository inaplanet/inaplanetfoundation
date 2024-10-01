import type { Metadata } from "next";
import { Orbitron } from 'next/font/google';
import './globals.css'

const orbitron = Orbitron({ subsets: ["latin"] });

import { headers } from 'next/headers';
import ContextProvider from "../../context";

export const metadata: Metadata = {
  title: 'Krashboxﮩ٨ـﮩﮩ٨ـﮩ٨ـﮩﮩ٨ـ',
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
      <body className={orbitron.className}>
        {/* Wrap everything in the ContextProvider and pass cookies */}
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}