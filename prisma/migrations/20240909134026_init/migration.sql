-- DropIndex
DROP INDEX "Student_ToName_key";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "ToName" TEXT NOT NULL,
    "FromName" TEXT NOT NULL,
    "Weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
