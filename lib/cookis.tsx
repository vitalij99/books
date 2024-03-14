'use server';
import { cookies } from 'next/headers';

export async function setCookies(name: string, value: string) {
  cookies().set(name, value);
}
export async function getCookies(name: string) {
  return cookies().get(name);
}
