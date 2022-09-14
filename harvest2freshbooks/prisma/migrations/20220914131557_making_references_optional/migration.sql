-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("harvestId", "id", "name") SELECT "harvestId", "id", "name" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_harvestId_key" ON "Task"("harvestId");
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
    "projectId" TEXT,
    "userId" TEXT,
    "clientId" TEXT,
    "taskId" TEXT,
    "userAssignmentId" TEXT,
    "taskAssignmentId" TEXT,
    CONSTRAINT "TaskTime_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_userAssignmentId_fkey" FOREIGN KEY ("userAssignmentId") REFERENCES "UserAssignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskTime_taskAssignmentId_fkey" FOREIGN KEY ("taskAssignmentId") REFERENCES "TaskAssignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TaskTime" ("billable", "billableRate", "budgeted", "clientId", "costRate", "createdAt", "endedTime", "harvestId", "hours", "hoursWithoutTimer", "id", "isBilled", "isClosed", "isRunning", "lockedReason", "notes", "projectId", "roundedHours", "spendDate", "startedTime", "taskAssignmentId", "taskId", "timerStartedAt", "updatedAt", "userAssignmentId", "userId") SELECT "billable", "billableRate", "budgeted", "clientId", "costRate", "createdAt", "endedTime", "harvestId", "hours", "hoursWithoutTimer", "id", "isBilled", "isClosed", "isRunning", "lockedReason", "notes", "projectId", "roundedHours", "spendDate", "startedTime", "taskAssignmentId", "taskId", "timerStartedAt", "updatedAt", "userAssignmentId", "userId" FROM "TaskTime";
DROP TABLE "TaskTime";
ALTER TABLE "new_TaskTime" RENAME TO "TaskTime";
CREATE UNIQUE INDEX "TaskTime_harvestId_key" ON "TaskTime"("harvestId");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT,
    CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("clientId", "harventId", "id", "name") SELECT "clientId", "harventId", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_harventId_key" ON "Project"("harventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
