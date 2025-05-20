import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import authConfig from './auth.config';

const global = {
  prisma: new PrismaClient(),
};

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },

  ...authConfig,
});
