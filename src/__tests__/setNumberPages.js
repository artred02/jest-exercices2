import { setNumberPages } from '../setNumberPages';

describe('setNumberPages', () => {
  test('should return 1 if total is not provided', () => {
    const result = setNumberPages({});
    expect(result).toBe(1);
  });

  test('should return 9 if max is not provided', () => {
    const result = setNumberPages({ total: 10 });
    expect(result).toBe(9);
  });

  test('should return 1 if total is less than or equal to max', () => {
    const result = setNumberPages({ total: 10, max: 20 });
    expect(result).toBe(1);
  });

  test('should return correct number of pages when total is greater than max', () => {
    const result = setNumberPages({ total: 100, max: 20 });
    expect(result).toBe(4);
  });

  test('should return correct number of pages when total is not divisible by max', () => {
    const result = setNumberPages({ total: 105, max: 20 });
    expect(result).toBe(5);
  });

  test('should return 1 if total or max is zero', () => {
    const result = setNumberPages({ total: 0, max: 20 });
    expect(result).toBe(1);
  });
});