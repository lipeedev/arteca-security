/*
  Warnings:

  - You are about to drop the column `guildId` on the `members` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "try" INTEGER NOT NULL DEFAULT 0,
    "timestampTry" DATETIME NOT NULL
);
INSERT INTO "new_members" ("id", "timestampTry", "try") SELECT "id", "timestampTry", "try" FROM "members";
DROP TABLE "members";
ALTER TABLE "new_members" RENAME TO "members";
CREATE UNIQUE INDEX "members_id_key" ON "members"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
