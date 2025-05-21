import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';

const providers: Provider[] = [
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
    authorize(c) {
      if (c.password !== 'password') return null;
      return {
        id: 'test',
        name: 'Test User',
        email: 'test@example.com',
      };
    },
  }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID || '',
    clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
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
