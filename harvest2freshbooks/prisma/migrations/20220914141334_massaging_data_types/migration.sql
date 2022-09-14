-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "billable" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "hourlyRate" INTEGER,
    "budget" INTEGER
);
INSERT INTO "new_TaskAssignment" ("billable", "budget", "harvestId", "hourlyRate", "id", "isActive") SELECT "billable", "budget", "harvestId", "hourlyRate", "id", "isActive" FROM "TaskAssignment";
DROP TABLE "TaskAssignment";
ALTER TABLE "new_TaskAssignment" RENAME TO "TaskAssignment";
CREATE UNIQUE INDEX "TaskAssignment_harvestId_key" ON "TaskAssignment"("harvestId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
