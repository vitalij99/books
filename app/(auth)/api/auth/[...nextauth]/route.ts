// import { handlers } from '@/auth';


// export const { GET, POST } = handlers;

import NextAuth, { User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import Credentials from 'next-auth/providers/credentials';
import { getUserEmail } from '@/lib/db';
import { comparePassword } from '@/utils/saltAndHashPassword';
import { signInSchema } from '@/lib/zod';
import { JWT } from 'next-auth/jwt';


const global = {
  prisma: new PrismaClient(),
};

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // async session({ session, token }) {
    //   if (token?.id && session.user) {
    //     session.user.id = token.id as string;
    //   }
    //   return session;
    // },
  },
  pages: {
    error: '/auth',
  },
});
