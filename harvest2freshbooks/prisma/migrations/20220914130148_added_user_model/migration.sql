/*
  Warnings:

  - Added the required column `clientId` to the `TaskTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `TaskTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskAssignmentId` to the `TaskTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `TaskTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAssignmentId` to the `TaskTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TaskTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "spendDate" TEXT NOT NULL,
    "hours" REAL NOT NULL,
    "hoursWithoutTimer" REAL NOT NULL,
    "roundedHours" REAL NOT NULL,
    "notes" TEXT,
    "lockedReason" TEXT,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "isBilled" BOOLEAN NOT NULL DEFAULT false,
    "timerStartedAt" DATETIME,
    "startedTime" TEXT,
    "endedTime" TEXT,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "billable" BOOLEAN NOT NULL DEFAULT true,
    "budgeted" BOOLEAN NOT NULL DEFAULT false,
    "billableRate" INTEGER NOT NULL DEFAULT 0,
    "costRate" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userAssignmentId" TEXT NOT NULL,
    "taskAssignmentId" TEXT NOT NULL,
    CONSTRAINT "TaskTime_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_userAssignmentId_fkey" FOREIGN KEY ("userAssignmentId") REFERENCES "UserAssignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_taskAssignmentId_fkey" FOREIGN KEY ("taskAssignmentId") REFERENCES "TaskAssignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TaskTime" ("billable", "billableRate", "budgeted", "costRate", "createdAt", "endedTime", "harvestId", "hours", "hoursWithoutTimer", "id", "isBilled", "isClosed", "isRunning", "lockedReason", "notes", "roundedHours", "spendDate", "startedTime", "timerStartedAt", "updatedAt") SELECT "billable", "billableRate", "budgeted", "costRate", "createdAt", "endedTime", "harvestId", "hours", "hoursWithoutTimer", "id", "isBilled", "isClosed", "isRunning", "lockedReason", "notes", "roundedHours", "spendDate", "startedTime", "timerStartedAt", "updatedAt" FROM "TaskTime";
DROP TABLE "TaskTime";
ALTER TABLE "new_TaskTime" RENAME TO "TaskTime";
CREATE UNIQUE INDEX "TaskTime_harvestId_key" ON "TaskTime"("harvestId");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("clientId", "harventId", "id") SELECT "clientId", "harventId", "id" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_harventId_key" ON "Project"("harventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_harvestId_key" ON "User"("harvestId");
