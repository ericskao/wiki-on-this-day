'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { useSettingsContext } from '@/context/SettingsContext';
import BirthdayTableView from './BirthdayTableView';
import BirthdayTimelineView from './BirthdayTimelineView';
import CardsSkeleton from './CardsSkeleton';

const BirthdayList = () => {
  const { loading, birthdays } = useBirthdayContext();
  const { view } = useSettingsContext();

  return (
    <div className="mt-12">
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
