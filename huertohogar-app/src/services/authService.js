import httpClient from '../api/httpClient.js';

const login = async (username, password) => {
  try {
    const response = await httpClient.post('/api/auth/login', { username, password });
    const { token, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return { token, role };
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export default { login, logout };
