-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "captchaChannelId" TEXT NOT NULL,
    "verifiedRoleId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_captchaChannelId_key" ON "Guild"("captchaChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_verifiedRoleId_key" ON "Guild"("verifiedRoleId");
