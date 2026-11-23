import httpClient from '../api/httpClient.js';
import MockAdapter from 'axios-mock-adapter';

describe('httpClient interceptor', () => {
  const mock = new MockAdapter(httpClient);

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('adds Authorization header when token exists', async () => {
    localStorage.setItem('token', 'test-token');
    mock.onGet('/test').reply((config) => {
      expect(config.headers.Authorization).toBe('Bearer test-token');
      return [200, {}];
    });
    await httpClient.get('/test');
  });

  test('clears session and redirects on 401', async () => {
    // Mock window.location
    delete window.location;
    window.location = { href: '' };
    mock.onGet('/unauth').reply(401);
    try {
      await httpClient.get('/unauth');
    } catch (e) {
      // expected rejection
    }
    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.href).toBe('/login');
  });
});
