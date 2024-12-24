'use client';

import { useEffect, useState } from 'react';

interface ServerComponentProps {
  children: React.ReactNode;
}

export default function ServerComponent({ children }: ServerComponentProps) {
  const [cookies, setCookies] = useState<string | null>(null);

  // Client-side only: get cookies in useEffect
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie || null; // Get cookies from the client-side
      setCookies(cookies); // Store cookies in state
    }
  }, []);

  return <>{children}</>;
}
