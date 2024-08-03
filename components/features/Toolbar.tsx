'use client';

import { useSettingsContext } from '@/context/SettingsContext';
import { TableCellsIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const ICON_WIDTH = 24;

const Toolbar = () => {
  const { view, setView } = useSettingsContext();
  return (
    <div>
      <Tabs value={view} className="w-[400px]">
        <TabsList>
          <TabsTrigger
            onClick={() => {
              if (view === 'table') setView('cards');
            }}
            value="cards"
          >
            <ViewColumnsIcon width={ICON_WIDTH} height={ICON_WIDTH} />
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              if (view === 'cards') setView('table');
            }}
            value="table"
          >
            <TableCellsIcon width={ICON_WIDTH} height={ICON_WIDTH} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Toolbar;
