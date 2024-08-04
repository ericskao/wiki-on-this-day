'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { Button } from '../ui/button';

const FetchButton = () => {
  const { birthdays, error, loading, getBirthdays } = useBirthdayContext();
  if ((birthdays && !error) || loading) {
    return null;
  }
  return (
    <div className="flex gap-x-2">
      <Button disabled={loading} onClick={() => getBirthdays()}>
        View Birthdays
      </Button>
      <Button
        disabled={loading}
        variant="destructive"
        onClick={() => getBirthdays('random string')}
      >
        Failure API Button
      </Button>
    </div>
  );
};

export default FetchButton;
