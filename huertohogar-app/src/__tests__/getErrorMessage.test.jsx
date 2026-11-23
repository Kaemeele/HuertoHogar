import { getErrorMessage } from '../utils/getErrorMessage.js';

describe('getErrorMessage utility', () => {
  test('maps known status codes', () => {
    const err400 = { response: { status: 400, data: {} } };
    expect(getErrorMessage(err400)).toBe('Bad request');
    const err401 = { response: { status: 401, data: {} } };
    expect(getErrorMessage(err401)).toBe('Unauthorized');
    const err404 = { response: { status: 404, data: {} } };
    expect(getErrorMessage(err404)).toBe('Not found');
    const err500 = { response: { status: 500, data: {} } };
    expect(getErrorMessage(err500)).toBe('Server error');
  });

  test('uses message from response body if present', () => {
    const err = { response: { status: 400, data: { error: 'Custom error' } } };
    expect(getErrorMessage(err)).toBe('Custom error');
  });

  test('handles timeout', () => {
    const err = { request: {}, code: 'ECONNABORTED' };
    expect(getErrorMessage(err)).toBe('Request timeout');
  });

  test('handles network error without request', () => {
    const err = { message: 'Network down' };
    expect(getErrorMessage(err)).toBe('Network down');
  });
});
