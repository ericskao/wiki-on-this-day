'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface SettingsInterface {
  view: 'table' | 'cards';
  setView: (view: 'table' | 'cards') => void;
}

const SettingsContext = createContext<SettingsInterface | undefined>(undefined);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<'table' | 'cards'>('cards');
  return (
    <SettingsContext.Provider value={{ view, setView }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider'
    );
  }
  return context;
};

export { SettingsProvider, useSettingsContext };
