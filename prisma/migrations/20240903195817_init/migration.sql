/*
  Warnings:

  - Made the column `name` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "imageData" SET DATA TYPE TEXT;
