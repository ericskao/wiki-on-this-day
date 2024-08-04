'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface SettingsInterface {
  view: 'table' | 'cards';
  setView: (view: 'table' | 'cards') => void;
  date: Date;
  setDate: (date: Date) => void;
}

const SettingsContext = createContext<SettingsInterface | undefined>(undefined);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<'table' | 'cards'>('cards');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <SettingsContext.Provider value={{ view, setView, date, setDate }}>
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
