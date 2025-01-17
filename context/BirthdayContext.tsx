'use client';

import { fetchBirthdays, FetchBirthdaysParamsType } from '@/app/actions';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSettingsContext } from './SettingsContext';

export interface WikiResponseInterface {
  text: string;
  year: number;
  pages: {
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
  }[];
}

interface BirthdayContextInterface {
  birthdays: WikiResponseInterface[] | null;
  loading: boolean;
  getBirthdays: (params: FetchBirthdaysParamsType) => void;
  error: string | null | undefined;
  clearError: () => void;
  hasInitialFetch: boolean;
}

const BirthdayContext = createContext<BirthdayContextInterface | undefined>(
  undefined
);

const BirthdayProvider = ({ children }: { children: ReactNode }) => {
  const { date } = useSettingsContext();
  const [birthdays, setBirthdays] = useState<WikiResponseInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined | null>(null);

  // use ref instead of state so updating initialFetch variable doesn't trigger a rerender
  const initialFetchRef = useRef(false);

  const clearError = () => setError(null);

  const getBirthdays = async (params: FetchBirthdaysParamsType) => {
    setLoading(true);
    // api will fail if fail param is passed in
    try {
      const result = await fetchBirthdays(params);
      if (result.success) {
        setBirthdays(result.data.births);
        initialFetchRef.current = true;
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

  useEffect(() => {
    if (date && initialFetchRef.current) {
      getBirthdays({ date });
    }
  }, [date, initialFetchRef]);

  return (
    <BirthdayContext.Provider
      value={{
        birthdays,
        loading,
        getBirthdays,
        error,
        clearError,
        hasInitialFetch: initialFetchRef.current,
      }}
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
