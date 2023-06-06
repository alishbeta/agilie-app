-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balances" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "pairId" INTEGER NOT NULL,

    CONSTRAINT "Balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiats" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Fiats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pairs" (
    "id" SERIAL NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "fiatId" INTEGER NOT NULL,

    CONSTRAINT "Pairs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "Pairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fiats" ADD CONSTRAINT "Fiats_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pairs" ADD CONSTRAINT "Pairs_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pairs" ADD CONSTRAINT "Pairs_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "Fiats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
