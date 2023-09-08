import { PrismaClient } from '@prisma/client';
import { prisma } from '@server/prisma';

export type Context = {
  prisma: PrismaClient;
};

export const context = {
  prisma,
};
