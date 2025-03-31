'use server';
import { cookies } from 'next/headers';

export async function setCookies(name: string, value: string) {
  (await cookies()).set(name, value);
}
export async function getCookies(name: string) {
  return (await cookies()).get(name);
}
