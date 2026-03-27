'use client';

import { createContext, useContext, useState, useTransition, ReactNode, TransitionStartFunction } from 'react';

interface TableTransitionContextType {
  isPending: boolean;
  loadingText: string;
  startTransitionWithText: (text: string, callback: () => void) => void;
}

const TableTransitionContext = createContext<TableTransitionContextType | null>(null);

export const TableTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  const [loadingText, setLoadingText] = useState('Loading...');

  const startTransitionWithText = (text: string, callback: () => void) => {
    setLoadingText(text);
    startTransition(callback);
  };

  return (
    <TableTransitionContext.Provider value={{ isPending, loadingText, startTransitionWithText }}>
      {children}
    </TableTransitionContext.Provider>
  );
};

export const useTableTransition = () => {
  const context = useContext(TableTransitionContext);
  if (!context) {
    throw new Error('useTableTransition must be used within a TableTransitionProvider');
  }
  return context;
};
