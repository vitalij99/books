'use server';
import { signIn } from '@/auth';

export async function login(provider?: string) {
  return await signIn(provider);
}
