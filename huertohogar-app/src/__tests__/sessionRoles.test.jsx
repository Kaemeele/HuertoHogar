import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import LoginPage from '../components/LoginPage.jsx';
import { vi } from 'vitest';

// Mock login service
vi.mock('../services/authService.js', () => ({
  login: vi.fn(async (u, p) => {
    if (u === 'admin' && p === 'admin123') {
      return { token: 'test-token', role: 'ADMIN' };
    }
    throw { response: { data: { error: 'Invalid credentials' } } };
  }),
  logout: vi.fn(),
}));

describe('Session persistence & role based routing', () => {
  test('Unauthenticated user is redirected to /login', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    await waitFor(() => {
      const headings = screen.getAllByText('Login');
      expect(headings.length).toBeGreaterThanOrEqual(2);
    });
  });

  test('Authenticated user with role ADMIN can access protected route', async () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'ADMIN');

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
                  <div>Admin Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Admin Content')).toBeInTheDocument();
    });
  });
});
