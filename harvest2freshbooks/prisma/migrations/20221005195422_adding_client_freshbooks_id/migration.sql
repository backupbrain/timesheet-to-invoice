/*
  Warnings:

  - A unique constraint covering the columns `[freshbooksId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[freshbooksId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN "freshbooksId" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "freshbooksId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Client_freshbooksId_key" ON "Client"("freshbooksId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_freshbooksId_key" ON "Project"("freshbooksId");
