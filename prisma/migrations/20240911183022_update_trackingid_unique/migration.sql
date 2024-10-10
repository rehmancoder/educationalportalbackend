/*
  Warnings:

  - A unique constraint covering the columns `[TrackingId]` on the table `LabelCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LabelCount_TrackingId_key" ON "LabelCount"("TrackingId");
