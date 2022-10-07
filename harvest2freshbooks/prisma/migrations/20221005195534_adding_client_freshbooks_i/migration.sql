/*
  Warnings:

  - You are about to alter the column `freshbooksId` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "freshbooksId" INTEGER,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL
);
INSERT INTO "new_Client" ("currency", "freshbooksId", "harvestId", "id", "name") SELECT "currency", "freshbooksId", "harvestId", "id", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_harvestId_key" ON "Client"("harvestId");
CREATE UNIQUE INDEX "Client_freshbooksId_key" ON "Client"("freshbooksId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
