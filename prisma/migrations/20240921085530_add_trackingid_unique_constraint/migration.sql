/*
  Warnings:

  - A unique constraint covering the columns `[TrackingId]` on the table `Label` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Label_TrackingId_key" ON "Label"("TrackingId");
