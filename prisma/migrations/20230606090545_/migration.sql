/*
  Warnings:

  - A unique constraint covering the columns `[ticker]` on the table `Fiats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticker]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fiats_ticker_key" ON "Fiats"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_ticker_key" ON "Tokens"("ticker");
