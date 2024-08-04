'use client';

import { fetchBirthdays } from '@/app/actions';
import { createContext, ReactNode, useContext, useState } from 'react';

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

interface BirthdayContextInterface {
  birthdays: WikiResponseInterface[] | null;
  loading: boolean;
  getBirthdays: (params?: string) => void;
  error: string | null | undefined;
  clearError: () => void;
}

const BirthdayContext = createContext<BirthdayContextInterface | undefined>(
  undefined
);

const BirthdayProvider = ({ children }: { children: ReactNode }) => {
  const [birthdays, setBirthdays] = useState<WikiResponseInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined | null>(null);

  const clearError = () => setError(null);

  const getBirthdays = async (params?: string) => {
    setLoading(true);
    // api will fail if params is passed in
    try {
      const result = await fetchBirthdays(JSON.stringify(params));
      if (result.success) {
        setBirthdays(result.data.births);
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error in getBirthdays:', error);
      // Handle any unexpected errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <BirthdayContext.Provider
      value={{ birthdays, loading, getBirthdays, error, clearError }}
    >
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
