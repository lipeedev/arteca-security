/*
  Warnings:

  - You are about to alter the column `timestampTry` on the `members` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "try" INTEGER NOT NULL DEFAULT 0,
    "guildId" TEXT NOT NULL,
    "timestampTry" BIGINT NOT NULL
);
INSERT INTO "new_members" ("guildId", "id", "timestampTry", "try") SELECT "guildId", "id", "timestampTry", "try" FROM "members";
DROP TABLE "members";
ALTER TABLE "new_members" RENAME TO "members";
CREATE UNIQUE INDEX "members_id_key" ON "members"("id");
CREATE UNIQUE INDEX "members_guildId_key" ON "members"("guildId");
CREATE UNIQUE INDEX "members_id_guildId_key" ON "members"("id", "guildId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
