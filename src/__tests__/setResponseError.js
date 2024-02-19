import { setResponseError, STATUS_HTTP, STATUS_API, STATUS_HTTP_MESSAGES } from '../setResponseError';

describe('setResponseError', () => {
  test('should return correct error object for WARNING status', () => {
    const response = { anomaly: { label: 'Warning message' }, status: STATUS_API.WARNING };
    const expectedResult = {
      label: 'Warning message',
      detail: '',
      type: 'danger',
      iconName: 'alert',
    };
    expect(setResponseError({ response })).toEqual(expectedResult);
  });

  test('should return correct error object for ERROR status', () => {
    const response = { anomaly: { label: 'Error message' }, status: STATUS_API.ERROR };
    const expectedResult = {
      label: 'Error message',
      detail: '',
    };
    expect(setResponseError({ response })).toEqual(expectedResult);
  });

  test('should return default error object when status is not WARNING or ERROR', () => {
    const response = { status: STATUS_HTTP.SUCCESS };
    expect(setResponseError({ response })).toEqual({});
  });

  test('should use default status message if anomaly.label is not provided', () => {
    const response = { status: STATUS_API.WARNING };
    const expectedResult = {
      label: STATUS_HTTP_MESSAGES[STATUS_API.WARNING],
      detail: '',
      type: 'danger',
      iconName: 'alert',
    };
    expect(setResponseError({ response })).toEqual(expectedResult);
  });

  test('should use error status message if anomaly.label is not provided', () => {
    const response = { status: STATUS_API.ERROR };
    const expectedResult = {
      label: STATUS_HTTP_MESSAGES[STATUS_API.ERROR],
      detail: '',
    };
    expect(setResponseError({ response })).toEqual(expectedResult);
  });

  test('should use provided anomaly detail and label', () => {
    const response = {
      anomaly: { label: 'Custom error', detail: 'Custom detail' },
      status: STATUS_API.ERROR,
    };
    const expectedResult = {
      label: 'Custom error',
      detail: 'Custom detail',
    };
    expect(setResponseError({ response })).toEqual(expectedResult);
  });
});