'use server';

import BirthdayList from '@/components/features/BirthdayList';
import ErrorDialog from '@/components/features/ErrorDialog';
import FetchButton from '@/components/features/FetchButton';
import Toolbar from '@/components/features/Toolbar';
import { BirthdayProvider } from '@/context/BirthdayContext';
import { SettingsProvider } from '@/context/SettingsContext';

export default async function Home() {
  // different languages
  // pagination
  // different days
  // types - holidays, deaths, events, etc

  return (
    <SettingsProvider>
      <BirthdayProvider>
        <main className="p-6">
          <Toolbar />
          <BirthdayList />
          <FetchButton />
          <ErrorDialog />
        </main>
      </BirthdayProvider>
    </SettingsProvider>
  );
}
