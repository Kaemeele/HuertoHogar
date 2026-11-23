import httpClient from '../api/httpClient.js';

const list = async () => {
  const response = await httpClient.get('/api/products');
  return response.data;
};

const find = async (id) => {
  const response = await httpClient.get(`/api/products/${id}`);
  return response.data;
};

const create = async (product) => {
  const response = await httpClient.post('/api/products', product);
  return response.data;
};

const update = async (id, product) => {
  const response = await httpClient.put(`/api/products/${id}`, product);
  return response.data;
};

const remove = async (id) => {
  await httpClient.delete(`/api/products/${id}`);
  // DELETE returns 204 No Content; we return undefined
};

export default { list, find, create, update, remove };
