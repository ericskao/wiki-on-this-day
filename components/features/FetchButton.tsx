'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { useSettingsContext } from '@/context/SettingsContext';
import { Button } from '../ui/button';

const FetchButton = () => {
  const { birthdays, error, loading, getBirthdays } = useBirthdayContext();
  const { date } = useSettingsContext();
  if ((birthdays && !error) || loading) {
    return null;
  }
  return (
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
  );
};

export default FetchButton;
