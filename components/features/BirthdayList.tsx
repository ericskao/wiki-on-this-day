'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { useSettingsContext } from '@/context/SettingsContext';
import BirthdayTableView from './BirthdayTableView';
import BirthdayTimelineView from './BirthdayTimelineView';

const BirthdayList = () => {
  const { loading, birthdays } = useBirthdayContext();
  const { view } = useSettingsContext();

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div>
        {view === 'cards' ? (
          <BirthdayTimelineView birthdays={birthdays} />
        ) : (
          <BirthdayTableView birthdays={birthdays} />
        )}
      </div>
    </div>
  );
};

export default BirthdayList;
