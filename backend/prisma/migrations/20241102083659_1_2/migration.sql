/*
  Warnings:

  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transactionType` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rentPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionActionTypes" AS ENUM ('bought', 'borrowed', 'returned');

-- CreateEnum
CREATE TYPE "CurrentStatusTypes" AS ENUM ('available', 'sold', 'lent');

-- CreateEnum
CREATE TYPE "RentDurationTypes" AS ENUM ('perHour', 'perDay', 'perWeek', 'perMonth', 'perYear');

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rentDuration" "RentDurationTypes" NOT NULL DEFAULT 'perHour',
ADD COLUMN     "rentPrice" DOUBLE PRECISION NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "CurrentStatusTypes" NOT NULL DEFAULT 'available';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionType",
ADD COLUMN     "transactionType" "TransactionActionTypes";

-- DropTable
DROP TABLE "ProductCategory";

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
