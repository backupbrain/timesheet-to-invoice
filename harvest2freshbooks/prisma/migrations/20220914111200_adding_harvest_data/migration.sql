-- CreateTable
CREATE TABLE "HarvestJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastPageDownloaded" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harventId" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "isProjectManager" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "useDefaultRates" BOOLEAN NOT NULL DEFAULT false,
    "budget" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TaskAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestId" INTEGER NOT NULL,
    "billable" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "hourlyRate" INTEGER NOT NULL DEFAULT 0,
    "budget" INTEGER
);

-- CreateTable
CREATE TABLE "TaskTime" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_harvestId_key" ON "Client"("harvestId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_harventId_key" ON "Project"("harventId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_harvestId_key" ON "Task"("harvestId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAssignment_harvestId_key" ON "UserAssignment"("harvestId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_harvestId_key" ON "TaskAssignment"("harvestId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskTime_harvestId_key" ON "TaskTime"("harvestId");
