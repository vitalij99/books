import NextAuth, { CredentialsSignin, User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { getUserEmail } from '@/lib/db';
import { comparePassword } from '@/utils/saltAndHashPassword';
import { signInSchema } from '@/lib/zod';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const global = {
  prisma: new PrismaClient(),
};

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
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
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserEmail(email);

          if (user && user.password) {
            const isValid = await comparePassword(password, user.password);

            if (!isValid) {
              throw new Error('Неправильний email або пароль');
            } else return user;
          } else {
            throw new Error('Користувач не знайдений.');
          }
        } catch (error: any) {
          throw new InvalidLoginError();
        }
      },
    }),
    Google,
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
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string; // Переконуємося, що це рядок
      }
      return session;
    },
  },
  pages: {
    error: '/api/auth/signin',
  },
});
