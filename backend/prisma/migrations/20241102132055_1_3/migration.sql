-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "totalViews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "rental_date_end" TIMESTAMP(3),
ADD COLUMN     "rental_date_start" TIMESTAMP(3);
