import { buildResponse } from '../buildResponse';
import { computeDataError } from '../computeDataError';
import { STATUS_API } from '../setResponseError';

// Mock computeDataError function
jest.mock('../computeDataError', () => ({
  computeDataError: jest.fn(),
}));

describe('buildResponse', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw error when status is ERROR', async () => {
    const response = { status: STATUS_API.ERROR };
    computeDataError.mockResolvedValue('Error message');

    await expect(buildResponse(response, {})).rejects.toEqual('Error message');
    expect(computeDataError).toHaveBeenCalledWith(response);
  });

  test('should throw error when status is WARNING', async () => {
    const response = { status: STATUS_API.WARNING };
    computeDataError.mockResolvedValue('Warning message');

    await expect(buildResponse(response, {})).rejects.toEqual('Warning message');
    expect(computeDataError).toHaveBeenCalledWith(response);
  });

  test('should return blob when config.blob is true', async () => {
    const response = { status: STATUS_API.SUCCESS, blob: jest.fn() };
    const config = { blob: true };

    await expect(buildResponse(response, config)).resolves.toBe(response.blob());
  });

  test('should return text when config.text is true', async () => {
    const response = { status: STATUS_API.SUCCESS, text: jest.fn() };
    const config = { text: true };

    await expect(buildResponse(response, config)).resolves.toBe(response.text());
  });

  test('should return JSON object with statusHttp when neither blob nor text config is true', async () => {
    const responseData = { foo: 'bar' };
    const response = { status: STATUS_API.SUCCESS, json: jest.fn().mockResolvedValue(responseData) };
    const config = {};

    await expect(buildResponse(response, config)).resolves.toEqual({
      ...responseData,
      statusHttp: STATUS_API.SUCCESS,
    });
  });

  test('should return statusHttp when status is not ERROR, WARNING, or SUCCESS', async () => {
    const response = { status: 'SOME_OTHER_STATUS' };

    await expect(buildResponse(response, {})).resolves.toEqual({
      statusHttp: 'SOME_OTHER_STATUS',
    });
  });
});
