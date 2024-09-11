import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { getUserEmail } from '@/lib/db';
import {
  comparePassword,
  saltAndHashPassword,
} from '@/utils/saltAndHashPassword';
import { signInSchema } from '@/lib/zod';
import { use } from 'react';

const global = {
  prisma: new PrismaClient(),
};

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your-email@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      authorize: async credentials => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await getUserEmail(email);
        if (user && user.password) {
          const isValid = await comparePassword(password, user.password);

          if (!isValid) {
            throw new Error('Неправильний email або пароль');
          }
          return user;
        } else {
          throw new Error('User not found.');
        }
      },
    }),
  ],
});
