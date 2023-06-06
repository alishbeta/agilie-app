/*
  Warnings:

  - You are about to drop the column `accountId` on the `Fiats` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fiats" DROP COLUMN "accountId";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "accountId";
