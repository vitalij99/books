import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {   PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"


 const global = {
  prisma: new PrismaClient,
};

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [Google],
})