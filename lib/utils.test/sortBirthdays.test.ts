// Unit tests for: sortBirthdays

import { WikiResponseInterface } from '@/context/BirthdayContext';
import { sortBirthdays } from '../utils';

describe('sortBirthdays() sortBirthdays method', () => {
  describe('Happy Path', () => {
    test('should sort birthdays in ascending order by year', () => {
      const birthdays: WikiResponseInterface[] = [
        { text: 'Person A', year: 2000, pages: [] },
        { text: 'Person B', year: 1990, pages: [] },
        { text: 'Person C', year: 2010, pages: [] },
      ];

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([
        { text: 'Person B', year: 1990, pages: [] },
        { text: 'Person A', year: 2000, pages: [] },
        { text: 'Person C', year: 2010, pages: [] },
      ]);
    });

    test('should return an empty array when input is an empty array', () => {
      const birthdays: WikiResponseInterface[] = [];

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([]);
    });
  });

  describe('Edge Cases', () => {
    test('should return an empty array when input is null', () => {
      const birthdays = null;

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([]);
    });

    test('should handle array with a single element', () => {
      const birthdays: WikiResponseInterface[] = [
        { text: 'Person A', year: 2000, pages: [] },
      ];

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([
        { text: 'Person A', year: 2000, pages: [] },
      ]);
    });

    test('should handle array with elements having the same year', () => {
      const birthdays: WikiResponseInterface[] = [
        { text: 'Person A', year: 2000, pages: [] },
        { text: 'Person B', year: 2000, pages: [] },
        { text: 'Person C', year: 2000, pages: [] },
      ];

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([
        { text: 'Person A', year: 2000, pages: [] },
        { text: 'Person B', year: 2000, pages: [] },
        { text: 'Person C', year: 2000, pages: [] },
      ]);
    });

    test('should handle array with negative years', () => {
      const birthdays: WikiResponseInterface[] = [
        { text: 'Person A', year: -500, pages: [] },
        { text: 'Person B', year: 0, pages: [] },
        { text: 'Person C', year: 500, pages: [] },
      ];

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([
        { text: 'Person A', year: -500, pages: [] },
        { text: 'Person B', year: 0, pages: [] },
        { text: 'Person C', year: 500, pages: [] },
      ]);
    });

    test('should handle array with mixed positive and negative years', () => {
      const birthdays: WikiResponseInterface[] = [
        { text: 'Person A', year: 2000, pages: [] },
        { text: 'Person B', year: -1990, pages: [] },
        { text: 'Person C', year: 0, pages: [] },
      ];

      const sortedBirthdays = sortBirthdays(birthdays);

      expect(sortedBirthdays).toEqual([
        { text: 'Person B', year: -1990, pages: [] },
        { text: 'Person C', year: 0, pages: [] },
        { text: 'Person A', year: 2000, pages: [] },
      ]);
    });
  });
});

// End of unit tests for: sortBirthdays
