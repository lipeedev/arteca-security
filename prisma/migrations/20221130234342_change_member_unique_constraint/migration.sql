/*
  Warnings:

  - A unique constraint covering the columns `[id,guildId]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "members_id_guildId_key" ON "members"("id", "guildId");
