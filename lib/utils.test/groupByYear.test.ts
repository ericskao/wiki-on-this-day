// Unit tests for: groupByYear

import { WikiResponseInterface } from '@/context/BirthdayContext';

import { groupByYear } from '../utils';

describe('groupByYear() groupByYear method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    test('should group objects by year correctly', () => {
      const input: WikiResponseInterface[] = [
        { text: 'Event 1', year: 2020, pages: [] },
        { text: 'Event 2', year: 2021, pages: [] },
        { text: 'Event 3', year: 2020, pages: [] },
      ];
      const expectedOutput = {
        2020: [
          { text: 'Event 1', year: 2020, pages: [] },
          { text: 'Event 3', year: 2020, pages: [] },
        ],
        2021: [{ text: 'Event 2', year: 2021, pages: [] }],
      };
      expect(groupByYear(input)).toEqual(expectedOutput);
    });

    test('should return an empty object for an empty array', () => {
      const input: WikiResponseInterface[] = [];
      const expectedOutput = {};
      expect(groupByYear(input)).toEqual(expectedOutput);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should handle array with one element correctly', () => {
      const input: WikiResponseInterface[] = [
        { text: 'Event 1', year: 2020, pages: [] },
      ];
      const expectedOutput = {
        2020: [{ text: 'Event 1', year: 2020, pages: [] }],
      };
      expect(groupByYear(input)).toEqual(expectedOutput);
    });

    test('should handle array with multiple elements having the same year', () => {
      const input: WikiResponseInterface[] = [
        { text: 'Event 1', year: 2020, pages: [] },
        { text: 'Event 2', year: 2020, pages: [] },
        { text: 'Event 3', year: 2020, pages: [] },
      ];
      const expectedOutput = {
        2020: [
          { text: 'Event 1', year: 2020, pages: [] },
          { text: 'Event 2', year: 2020, pages: [] },
          { text: 'Event 3', year: 2020, pages: [] },
        ],
      };
      expect(groupByYear(input)).toEqual(expectedOutput);
    });

    test('should handle array with elements having different years', () => {
      const input: WikiResponseInterface[] = [
        { text: 'Event 1', year: 2019, pages: [] },
        { text: 'Event 2', year: 2020, pages: [] },
        { text: 'Event 3', year: 2021, pages: [] },
      ];
      const expectedOutput = {
        2019: [{ text: 'Event 1', year: 2019, pages: [] }],
        2020: [{ text: 'Event 2', year: 2020, pages: [] }],
        2021: [{ text: 'Event 3', year: 2021, pages: [] }],
      };
      expect(groupByYear(input)).toEqual(expectedOutput);
    });

    test('should handle array with negative years', () => {
      const input: WikiResponseInterface[] = [
        { text: 'Event 1', year: -500, pages: [] },
        { text: 'Event 2', year: -500, pages: [] },
        { text: 'Event 3', year: -400, pages: [] },
      ];
      const expectedOutput = {
        '-500': [
          { text: 'Event 1', year: -500, pages: [] },
          { text: 'Event 2', year: -500, pages: [] },
        ],
        '-400': [{ text: 'Event 3', year: -400, pages: [] }],
      };
      expect(groupByYear(input)).toEqual(expectedOutput);
    });

    test('should handle array with zero year', () => {
      const input: WikiResponseInterface[] = [
        { text: 'Event 1', year: 0, pages: [] },
        { text: 'Event 2', year: 0, pages: [] },
      ];
      const expectedOutput = {
        0: [
          { text: 'Event 1', year: 0, pages: [] },
          { text: 'Event 2', year: 0, pages: [] },
        ],
      };
      expect(groupByYear(input)).toEqual(expectedOutput);
    });
  });
});

// End of unit tests for: groupByYear
