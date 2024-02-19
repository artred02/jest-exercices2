import manageConfig from '../manageConfig';

const API_URL = {
    BASE: 'base',
    GITHUB: 'github',
};

describe('manageConfig', () => {
  test('should return fetchAuthConfig as it is for BASE API', () => {
    const fetchAuthConfig = { headers: { Authorization: 'Bearer token' }, method: 'GET' };
    const result = manageConfig(API_URL.BASE, fetchAuthConfig);
    expect(result).toEqual(fetchAuthConfig);
  });

  test('should remove headers for non-BASE APIs', () => {
    const fetchAuthConfig = { headers: { Authorization: 'Bearer token' }, method: 'GET' };
    const result = manageConfig(API_URL.GITHUB, fetchAuthConfig);
    expect(result).toEqual({ method: 'GET' });
  });

  test('should handle empty fetchAuthConfig', () => {
    const fetchAuthConfig = {};
    const result = manageConfig(API_URL.GITHUB, fetchAuthConfig);
    expect(result).toEqual({});
  });

  test('should handle undefined fetchAuthConfig', () => {
    const result = manageConfig(API_URL.GITHUB, undefined);
    expect(result).toEqual({});
  });
});