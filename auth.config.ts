import type { NextAuthConfig } from 'next-auth';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { JWT } from 'next-auth/jwt';
import { signInSchema } from '@/lib/zod';

import { comparePassword } from '@/utils/saltAndHashPassword';
import { getUserEmail } from '@/lib/db';

const googleProvider = Google({
  profile: (profile: GoogleProfile) => {
    const name =
      `${profile.given_name} ${profile.family_name}`.toLowerCase() ?? 'unknown';
    return {
      id: profile.sub,
      email: profile.email,
      image: profile.picture,
      name,
    };
  },
  clientId: process.env.AUTH_GOOGLE_ID || '',
  clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
  allowDangerousEmailAccountLinking: true,
});

const providers: Provider[] = [
  googleProvider,
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
        const { email, password } = await signInSchema.parseAsync(credentials);
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
];

// if more providers
// export const providerMap = providers
//   .map(provider => {
//     if (typeof provider === 'function') {
//       const providerData = provider();
//       return { id: providerData.id, name: providerData.name };
//     } else {
//       return { id: provider.id, name: provider.name };
//     }
//   })
//   .filter(provider => provider.id !== 'credentials');

export default {
  providers,
  callbacks: {
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
} satisfies NextAuthConfig;
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
