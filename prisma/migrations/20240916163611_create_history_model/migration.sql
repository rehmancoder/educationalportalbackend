/*
  Warnings:

  - Added the required column `Tracking` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "Tracking" TEXT NOT NULL;
