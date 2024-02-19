import { isValidDate, formatDate, setDate } from '../formatDate';

describe('isValidDate', () => {
  test('should return true for valid date', () => {
    expect(isValidDate('2024-02-19')).toBe(true);
  });

  test('should return false for empty string', () => {
    expect(isValidDate('')).toBe(false);
  });

  test('should return false for null', () => {
    expect(isValidDate(null)).toBe(false);
  });

  test('should return false for undefined', () => {
    expect(isValidDate(undefined)).toBe(false);
  });
});

describe('formatDate', () => {
  test('should format date correctly', () => {
    const formattedDate = formatDate('2024-02-19', 'fr-FR');
    expect(formattedDate).toBe('19/02/2024');
  });

  test('should handle empty date', () => {
    const formattedDate = formatDate('');
    expect(formattedDate).toBe('');
  });

  test('should handle default date', () => {
    const formattedDate = formatDate();
    expect(formattedDate).toBe('01/01/1970');
  });
});

describe('setDate', () => {
  test('should return formatted date for valid input', () => {
    const date = '2024-02-19';
    const formattedDate = setDate({ date });
    expect(formattedDate).toBe('19/02/2024');
  });

  test('should return empty string for invalid input', () => {
    const date = '';
    const formattedDate = setDate({ date });
    expect(formattedDate).toBe('');
  });
});