'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { fetchBirthdays } from '../actions';

export interface WikiResponseInterface {
  text: string;
  year: number;
  pages: [
    {
      description: string;
      extract: string;
      titles: {
        normalized: string;
      };
      thumbnail: {
        source: string;
        width: number;
        height: number;
      };
      normalizedtitle: string;
    }
  ];
}

interface BirthdayContextType {
  birthdays: WikiResponseInterface[] | null;
  loading: boolean;
  getBirthdays: () => void;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(
  undefined
);

const BirthdayProvider = ({ children }: { children: ReactNode }) => {
  const [birthdays, setBirthdays] = useState<WikiResponseInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getBirthdays = async () => {
    setLoading(true);
    const response = await fetchBirthdays();
    setBirthdays(response.births);
    setLoading(false);
  };

  return (
    <BirthdayContext.Provider value={{ birthdays, loading, getBirthdays }}>
      {children}
    </BirthdayContext.Provider>
  );
};

const useBirthdayContext = () => {
  const context = useContext(BirthdayContext);
  if (context === undefined) {
    throw new Error(
      'useBirthdayContext must be used within a BirthdayProvider'
    );
  }
  return context;
};

export { BirthdayProvider, useBirthdayContext };
