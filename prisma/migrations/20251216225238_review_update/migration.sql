/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `isShow` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `ReviewTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `authorRole` on the `ReviewTranslation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "avatarUrl",
DROP COLUMN "isShow",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ReviewTranslation" DROP COLUMN "authorName",
DROP COLUMN "authorRole";
