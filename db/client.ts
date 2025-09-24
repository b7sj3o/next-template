/* import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'; */

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

/* const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClient = globalForPrisma.prisma ?? new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient;

export const prisma = prismaClient; */