import setConfirmClassModifier from '../setConfirmClassModifier';

describe('setConfirmClassModifier', () => {
  test('should return default classModifier if no errors', () => {
    const result = setConfirmClassModifier(false);
    expect(result).toBe('confirm success');
  });

  test('should append "disabled" to classModifier if has errors', () => {
    const result = setConfirmClassModifier(true);
    expect(result).toBe('confirm disabled');
  });

  test('should allow custom classModifier', () => {
    const result = setConfirmClassModifier(false, 'custom');
    expect(result).toBe('custom success');
  });

  test('should allow custom classModifier and append "disabled" if has errors', () => {
    const result = setConfirmClassModifier(true, 'custom');
    expect(result).toBe('custom disabled');
  });
});