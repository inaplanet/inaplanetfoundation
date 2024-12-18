'use client'; // Marking this as a client component
import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

interface WebSocketContextType {
  wsRef: React.RefObject<WebSocket | null>;
  isWebSocketReady: boolean;
  setIsWebSocketReady: React.Dispatch<React.SetStateAction<boolean>>;
  initializeWebSocket: (playerId: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const initializeWebSocket = useCallback((playerId: string) => {
    console.log('Initializing WebSocket...');
    if (!playerId) {
      console.error('Cannot initialize WebSocket: playerId is missing');
      return;
    }
  
    if (wsRef.current) {
      console.log('WebSocket already initialized');
      return;
    }
  
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const serverAddress = `wss://krashbox.glitch.me?token=${token}`;
    console.log('WebSocket server address:', serverAddress);
  
    wsRef.current = new WebSocket(serverAddress);
  
    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      setIsWebSocketReady(true);
    };
  
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    wsRef.current.onclose = () => {
      console.log('WebSocket closed');
    };
  }, []);  

  return (
    <WebSocketContext.Provider value={{ wsRef, isWebSocketReady, setIsWebSocketReady, initializeWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
