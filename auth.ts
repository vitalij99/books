import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import Credentials from 'next-auth/providers/credentials';
import { getUserEmail } from '@/lib/db';
import { comparePassword } from '@/utils/saltAndHashPassword';
import { signInSchema } from '@/lib/zod';
import { JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';

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
  basePath: '/auth',
  providers: [
    Google,
    Credentials({
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
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          const user = await getUserEmail(email);

          if (!user) {
            return null;
          }

          if (user && user.password) {
            const isValid = await comparePassword(password, user.password);

            if (!isValid) {
              return null;
            } else return user;
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error('Неправильний email або пароль.', error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === 'update') token.name = session.user.name;
      if (account?.provider === 'keycloak') {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    error: '/auth',
    signIn: '/auth',
  },
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
