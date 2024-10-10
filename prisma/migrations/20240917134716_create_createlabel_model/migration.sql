-- CreateTable
CREATE TABLE "CreateLabel" (
    "id" SERIAL NOT NULL,
    "ToName" TEXT NOT NULL,
    "FromName" TEXT NOT NULL,
    "Weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreateLabel_pkey" PRIMARY KEY ("id")
);
