/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `imageData` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ToName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FromName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ToName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Weight` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "imageData",
DROP COLUMN "name",
DROP COLUMN "section",
ADD COLUMN     "FromName" TEXT NOT NULL,
ADD COLUMN     "ToName" TEXT NOT NULL,
ADD COLUMN     "Weight" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_ToName_key" ON "Student"("ToName");
