'use server';

import BirthdayList from '@/components/features/BirthdayList';
import FetchButton from '@/components/features/FetchButton';
import { BirthdayProvider } from './context/AppContext';

export default async function Home() {
  // different languages
  // pagination
  // different days
  // types - holidays, deaths, events, etc

  return (
    <BirthdayProvider>
      <main className="p-6">
        <BirthdayList />
        <FetchButton />
      </main>
    </BirthdayProvider>
  );
}
