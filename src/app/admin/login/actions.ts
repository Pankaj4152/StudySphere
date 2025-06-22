
'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'admin-auth';

export async function loginAction(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set(AUTH_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return { success: true, message: 'Login successful' };
  } else {
    return { success: false, message: 'Invalid password' };
  }
}

export async function logoutAction() {
  cookies().delete(AUTH_COOKIE_NAME);
  return { success: true, message: 'Logged out' };
}
