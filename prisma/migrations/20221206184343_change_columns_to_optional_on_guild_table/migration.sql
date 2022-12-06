-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "captchaChannelId" TEXT,
    "verifiedRoleId" TEXT,
    "mainPartitionRoleId" TEXT,
    "statusPartitionRoleId" TEXT,
    "comunityPartitionRoleId" TEXT,
    "profilePartitionRoleId" TEXT,
    "permissionPartitionRoleId" TEXT,
    "rolesPartitionRoleId" TEXT,
    "pingPartitionRoleId" TEXT
);
INSERT INTO "new_guilds" ("captchaChannelId", "comunityPartitionRoleId", "id", "mainPartitionRoleId", "permissionPartitionRoleId", "pingPartitionRoleId", "profilePartitionRoleId", "rolesPartitionRoleId", "statusPartitionRoleId", "verifiedRoleId") SELECT "captchaChannelId", "comunityPartitionRoleId", "id", "mainPartitionRoleId", "permissionPartitionRoleId", "pingPartitionRoleId", "profilePartitionRoleId", "rolesPartitionRoleId", "statusPartitionRoleId", "verifiedRoleId" FROM "guilds";
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
