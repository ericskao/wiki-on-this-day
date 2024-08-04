'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { useSettingsContext } from '@/context/SettingsContext';
import { format } from 'date-fns';
import { Button } from '../ui/button';

const FetchButton = () => {
  const { birthdays, error, loading, getBirthdays } = useBirthdayContext();
  const { date } = useSettingsContext();
  if ((birthdays && !error) || loading) {
    return null;
  }
  return (
    <div>
      <h1 className="p-4 font-bold">
        Click to fetch {format(date, 'MMMM d')} birthdays from Wikipedia.
      </h1>
      <div className="flex gap-x-2 justify-center">
        <Button disabled={loading} onClick={() => getBirthdays({ date })}>
          View Birthdays
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={() => getBirthdays({ fail: true, date })}
        >
          Failure API Button
        </Button>
      </div>
    </div>
  );
};

export default FetchButton;
