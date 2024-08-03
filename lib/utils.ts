import { WikiResponseInterface } from '@/context/BirthdayContext';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TO-DO: unit tests, maybe deprecate?
export function sortBirthdays(birthdays: WikiResponseInterface[] | null) {
  if (Array.isArray(birthdays)) {
    return birthdays.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });
  } else {
    return [];
  }
}

// TO-DO: unit tests
export function groupByYear(array: WikiResponseInterface[] | null) {
  if (!array) {
    return [];
  }
  return array.reduce(
    (acc: { [key: number]: WikiResponseInterface[] }, obj) => {
      const key = obj.year;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    },
    {}
  );
}
