'use client';

import { useBirthdayContext } from '@/context/BirthdayContext';
import { useSettingsContext } from '@/context/SettingsContext';
import { TableCellsIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { DatePicker } from './DatePicker';

const ICON_WIDTH = 24;

const Toolbar = () => {
  const { view, setView, date, setDate } = useSettingsContext();
  const { birthdays } = useBirthdayContext();
  return (
    <div className="flex">
      <Tabs value={view} className="w-[400px]">
        <TabsList>
          <TabsTrigger
            disabled={birthdays == null}
            onClick={() => {
              if (view === 'table') setView('cards');
            }}
            value="cards"
          >
            <ViewColumnsIcon width={ICON_WIDTH} height={ICON_WIDTH} />
          </TabsTrigger>
          <TabsTrigger
            disabled={birthdays == null}
            onClick={() => {
              if (view === 'cards') setView('table');
            }}
            value="table"
          >
            <TableCellsIcon width={ICON_WIDTH} height={ICON_WIDTH} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <DatePicker date={date} setDate={setDate} />
    </div>
  );
};

export default Toolbar;
