import { computeDataError } from '../computeDataError';
import { setResponseError, STATUS_HTTP_MESSAGES } from '../setResponseError';

// Mock setResponseError function
jest.mock('../setResponseError', () => ({
  setResponseError: jest.fn(),
  STATUS_HTTP_MESSAGES: {
    400: 'Bad Request',
    404: 'Not Found',
  },
}));

describe('computeDataError', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call setResponseError with JSON data and status code', async () => {
    const response = {
      status: 404,
      json: jest.fn().mockResolvedValue({ errorMessage: 'Not found' }),
    };

    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: { errorMessage: 'Not found', status: 404 },
    });
  });

  test('should call setResponseError with anomaly label when JSON parsing fails', async () => {
    const response = {
      status: 500,
      json: jest.fn().mockRejectedValue(new Error('Failed to parse JSON')),
    };

    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: STATUS_HTTP_MESSAGES[500] },
        status: 500,
      },
    });
  });
});