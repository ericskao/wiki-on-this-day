'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { Button } from '../ui/button';

const FetchButton = () => {
  const { birthdays, error, loading, getBirthdays } = useBirthdayContext();
  if (birthdays && !error) {
    return null;
  }
  return (
    <Button disabled={loading} onClick={getBirthdays}>
      View Birthdays
    </Button>
  );
};

export default FetchButton;
