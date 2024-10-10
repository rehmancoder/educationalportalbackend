/*
  Warnings:

  - Added the required column `pdf` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "pdf" BYTEA NOT NULL;
