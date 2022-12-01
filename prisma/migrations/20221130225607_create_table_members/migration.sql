/*
  Warnings:

  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Guild";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "captchaChannelId" TEXT NOT NULL,
    "verifiedRoleId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "try" INTEGER NOT NULL DEFAULT 0,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "members_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_id_key" ON "guilds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "guilds_captchaChannelId_key" ON "guilds"("captchaChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "guilds_verifiedRoleId_key" ON "guilds"("verifiedRoleId");

-- CreateIndex
CREATE UNIQUE INDEX "members_id_key" ON "members"("id");
