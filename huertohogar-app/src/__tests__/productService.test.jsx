import productService from '../services/productService.js';
import httpClient from '../api/httpClient.js';
import MockAdapter from 'axios-mock-adapter';

describe('productService CRUD', () => {
  const mock = new MockAdapter(httpClient);

  afterEach(() => {
    mock.reset();
  });

  test('list returns data', async () => {
    const dummy = [{ id: 1, name: 'A' }];
    mock.onGet('/api/products').reply(200, dummy);
    const data = await productService.list();
    expect(data).toEqual(dummy);
  });

  test('create returns created product', async () => {
    const payload = { name: 'B' };
    const returned = { id: 2, ...payload };
    mock.onPost('/api/products', payload).reply(201, returned);
    const data = await productService.create(payload);
    expect(data).toEqual(returned);
  });

  test('update returns updated product', async () => {
    const payload = { name: 'C' };
    const returned = { id: 3, ...payload };
    mock.onPut('/api/products/3', payload).reply(200, returned);
    const data = await productService.update(3, payload);
    expect(data).toEqual(returned);
  });

  test('remove handles 204 No Content', async () => {
    mock.onDelete('/api/products/4').reply(204);
    await expect(productService.remove(4)).resolves.toBeUndefined();
  });
});
