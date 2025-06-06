import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function login(token: string) {
  Cookies.set('token', token);
}

export function logout() {
  Cookies.remove('token');
}

export function getToken() {
  return Cookies.get('token');
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}
