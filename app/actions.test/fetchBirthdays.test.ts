// Unit tests for: fetchBirthdays

import { fetchBirthdays } from '../actions';

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetchBirthdays() fetchBirthdays method', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should return data successfully when valid date is provided', async () => {
      // Arrange
      const mockDate = new Date(2023, 9, 10); // October 10, 2023
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ births: [] }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await fetchBirthdays({ date: mockDate });

      // Assert
      expect(result).toEqual({
        success: true,
        data: { births: [] },
        status: 200,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/10/10'
      );
    });
  });

  describe('Edge Cases', () => {
    it('should return an error when date is not provided', async () => {
      // Act
      const result = await fetchBirthdays({ date: undefined });

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'API request failed. Please try again later.',
        status: 400,
      });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return an error when fail flag is set to true', async () => {
      // Arrange
      const mockDate = new Date(2023, 9, 10); // October 10, 2023

      // Act
      const result = await fetchBirthdays({ date: mockDate, fail: true });

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'API request failed. Please try again later.',
        status: 400,
      });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return an error when fetch response is not ok', async () => {
      // Arrange
      const mockDate = new Date(2023, 9, 10); // October 10, 2023
      const mockResponse = {
        ok: false,
        json: jest.fn(),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await fetchBirthdays({ date: mockDate });

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'API request failed',
        status: 400,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/10/10'
      );
    });

    it('should return an error when fetch throws an error', async () => {
      // Arrange
      const mockDate = new Date(2023, 9, 10); // October 10, 2023
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      // Act
      const result = await fetchBirthdays({ date: mockDate });

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'Network error',
        status: 400,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/10/10'
      );
    });

    it('should return an error with unknown error message when fetch throws a non-error object', async () => {
      // Arrange
      const mockDate = new Date(2023, 9, 10); // October 10, 2023
      (global.fetch as jest.Mock).mockRejectedValue('Some error');

      // Act
      const result = await fetchBirthdays({ date: mockDate });

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'Unknown error',
        status: 400,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/10/10'
      );
    });
  });
});

// End of unit tests for: fetchBirthdays
