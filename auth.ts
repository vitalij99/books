import NextAuth from "next-auth"
import "next-auth/jwt"


import Google from "next-auth/providers/google"

import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserEmail } from "./lib/db"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { comparePassword } from "./utils/saltAndHashPassword"

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
    Google,
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {

    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
  },

})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
