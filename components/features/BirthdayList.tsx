'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { useSettingsContext } from '@/context/SettingsContext';
import { format } from 'date-fns';
import BirthdayTableView from './BirthdayTableView';
import BirthdayTimelineView from './BirthdayTimelineView';
import CardsSkeleton from './CardsSkeleton';

const BirthdayList = () => {
  const { loading, birthdays, hasInitialFetch } = useBirthdayContext();
  const { view, date } = useSettingsContext();

  return (
    <div className="mt-12">
      {hasInitialFetch && (
        <h1 className="p-4 font-bold">Birthdays on {format(date, 'MMMM d')}</h1>
      )}
      {loading && <CardsSkeleton />}
      {view === 'cards' ? (
        <BirthdayTimelineView birthdays={birthdays} />
      ) : (
        <BirthdayTableView birthdays={birthdays} />
      )}
    </div>
  );
};

export default BirthdayList;
