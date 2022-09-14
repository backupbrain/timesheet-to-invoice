/*
  Warnings:

  - You are about to drop the column `harventId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `harvestId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT,
    CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("clientId", "id", "name") SELECT "clientId", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_harvestId_key" ON "Project"("harvestId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
