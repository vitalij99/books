import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import Credentials from 'next-auth/providers/credentials';
import { getUserEmail } from '@/lib/db';
import { comparePassword } from '@/utils/saltAndHashPassword';
import { signInSchema } from '@/lib/zod';
import { JWT } from 'next-auth/jwt';

import Google, { GoogleProfile } from 'next-auth/providers/google';

import authConfig from './auth.config';

const global = {
  prisma: new PrismaClient(),
};

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },

  ...authConfig,
});
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
