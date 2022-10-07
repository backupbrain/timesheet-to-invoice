-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "street2" TEXT NOT NULL,
    "ordinance" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "freshbooksId" INTEGER,
    "addressId" TEXT,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("currency", "freshbooksId", "harvestId", "id", "name") SELECT "currency", "freshbooksId", "harvestId", "id", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_harvestId_key" ON "Client"("harvestId");
CREATE UNIQUE INDEX "Client_freshbooksId_key" ON "Client"("freshbooksId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
