'use client';

import { useBirthdayContext } from '@/app/context/AppContext';
import { Button } from '../ui/button';

const FetchButton = () => {
  const { getBirthdays } = useBirthdayContext();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Button onClick={getBirthdays}>View Birthdays</Button>
    </form>
  );
};

export default FetchButton;
