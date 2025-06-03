const API_BASE = 'https://api.leboncoin.fr';

export interface LoginResponse {
  token: string;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error('Login failed');
  }
  const data = (await res.json()) as LoginResponse;
  localStorage.setItem('lbc_token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('lbc_token');
}

export function getToken(): string | null {
  return localStorage.getItem('lbc_token');
}
