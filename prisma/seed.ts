import { PrismaClient } from '@prisma/client';
import { create } from 'domain';
const prisma = new PrismaClient();

async function main() {
  await prisma.accounts.upsert({
    create: {
      name: "Jon's account",
      balances: {
        create: {
          amount: 100,
          amountRef: 0,
          token: { create: { ticker: 'XRP' } },
          fiatRef: { create: { ticker: 'USD' } },
        },
      },
    },
    where: {
      id: 1,
    },
    update: {},
  });

  await prisma.accounts.upsert({
    create: {
      name: "Kyle's account",
      balances: {
        create: {
          amount: 100,
          amountRef: 0,
          token: {
            create: { ticker: 'XBT' },
          },
          fiatRef: {
            create: { ticker: 'EUR' },
          },
        },
      },
    },
    where: {
      id: 2,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
