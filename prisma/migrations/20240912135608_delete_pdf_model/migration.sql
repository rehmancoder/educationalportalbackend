/*
  Warnings:

  - You are about to drop the `Pdf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_userId_fkey";

-- DropTable
DROP TABLE "Pdf";
