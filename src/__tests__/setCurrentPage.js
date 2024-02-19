import { setCurrentPage } from '../setCurrentPage';

describe('setCurrentPage', () => {
  test('should return 1 if max is 0', () => {
    const result = setCurrentPage({ max: 0, skip: 10 });
    expect(result).toBe(1);
  });

  test('should return correct page number when skip is a multiple of max', () => {
    const result = setCurrentPage({ max: 10, skip: 20 });
    expect(result).toBe(2);
  });

  test('should return correct page number when skip is not a multiple of max', () => {
    const result = setCurrentPage({ max: 10, skip: 25 });
    expect(result).toBe(3);
  });

  test('should return 1 if max or skip is not provided', () => {
    const result = setCurrentPage({});
    expect(result).toBe(1);
  });

  test('should return 1 if max is provided but invalid', () => {
    const result = setCurrentPage({ max: 'invalid', skip: 20 });
    expect(result).toBe(1);
  });

  test('should return 1 if skip is provided but invalid', () => {
    const result = setCurrentPage({ max: 10, skip: 'invalid' });
    expect(result).toBe(1);
  });
});