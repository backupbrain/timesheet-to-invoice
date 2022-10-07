-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT,
    "street2" TEXT,
    "ordinance" TEXT,
    "region" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL
);
INSERT INTO "new_Address" ("country", "id", "ordinance", "postalCode", "region", "street", "street2") SELECT "country", "id", "ordinance", "postalCode", "region", "street", "street2" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
