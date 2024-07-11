const { PrismaClient } = require('@prisma/client');

const global = {
  prisma: PrismaClient ,
};

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL');
}

export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}
