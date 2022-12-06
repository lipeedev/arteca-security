/*
  Warnings:

  - Added the required column `comunityPartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainPartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionPartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pingPartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolesPartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusPartitionRoleId` to the `guilds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "captchaChannelId" TEXT NOT NULL,
    "verifiedRoleId" TEXT NOT NULL,
    "mainPartitionRoleId" TEXT NOT NULL,
    "statusPartitionRoleId" TEXT NOT NULL,
    "comunityPartitionRoleId" TEXT NOT NULL,
    "profilePartitionRoleId" TEXT NOT NULL,
    "permissionPartitionRoleId" TEXT NOT NULL,
    "rolesPartitionRoleId" TEXT NOT NULL,
    "pingPartitionRoleId" TEXT NOT NULL
);
INSERT INTO "new_guilds" ("captchaChannelId", "id", "verifiedRoleId") SELECT "captchaChannelId", "id", "verifiedRoleId" FROM "guilds";
DROP TABLE "guilds";
ALTER TABLE "new_guilds" RENAME TO "guilds";
CREATE UNIQUE INDEX "guilds_id_key" ON "guilds"("id");
CREATE UNIQUE INDEX "guilds_captchaChannelId_key" ON "guilds"("captchaChannelId");
CREATE UNIQUE INDEX "guilds_verifiedRoleId_key" ON "guilds"("verifiedRoleId");
CREATE UNIQUE INDEX "guilds_mainPartitionRoleId_key" ON "guilds"("mainPartitionRoleId");
CREATE UNIQUE INDEX "guilds_statusPartitionRoleId_key" ON "guilds"("statusPartitionRoleId");
CREATE UNIQUE INDEX "guilds_comunityPartitionRoleId_key" ON "guilds"("comunityPartitionRoleId");
CREATE UNIQUE INDEX "guilds_profilePartitionRoleId_key" ON "guilds"("profilePartitionRoleId");
CREATE UNIQUE INDEX "guilds_permissionPartitionRoleId_key" ON "guilds"("permissionPartitionRoleId");
CREATE UNIQUE INDEX "guilds_rolesPartitionRoleId_key" ON "guilds"("rolesPartitionRoleId");
CREATE UNIQUE INDEX "guilds_pingPartitionRoleId_key" ON "guilds"("pingPartitionRoleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
