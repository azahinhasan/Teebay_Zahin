/*
  Warnings:

  - You are about to drop the column `rental_date_end` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `rental_date_start` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "rental_date_end",
DROP COLUMN "rental_date_start",
ADD COLUMN     "rentalDateEnd" TIMESTAMP(3),
ADD COLUMN     "rentalDateStart" TIMESTAMP(3);
