/*
  Warnings:

  - Added the required column `timestampTry` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "try" INTEGER NOT NULL DEFAULT 0,
    "guildId" TEXT NOT NULL,
    "timestampTry" INTEGER NOT NULL
);
INSERT INTO "new_members" ("guildId", "id", "try") SELECT "guildId", "id", "try" FROM "members";
DROP TABLE "members";
ALTER TABLE "new_members" RENAME TO "members";
CREATE UNIQUE INDEX "members_id_key" ON "members"("id");
CREATE UNIQUE INDEX "members_guildId_key" ON "members"("guildId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
