/*
  Warnings:

  - You are about to drop the column `pairId` on the `Balances` table. All the data in the column will be lost.
  - You are about to drop the `Pairs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amountRef` to the `Balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiatId` to the `Balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `Balances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balances" DROP CONSTRAINT "Balances_pairId_fkey";

-- DropForeignKey
ALTER TABLE "Pairs" DROP CONSTRAINT "Pairs_fiatId_fkey";

-- DropForeignKey
ALTER TABLE "Pairs" DROP CONSTRAINT "Pairs_tokenId_fkey";

-- AlterTable
ALTER TABLE "Balances" DROP COLUMN "pairId",
ADD COLUMN     "amountRef" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "fiatId" INTEGER NOT NULL,
ADD COLUMN     "tokenId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Pairs";

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "Fiats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
