/*
  Warnings:

  - You are about to drop the column `path` on the `avatars` table. All the data in the column will be lost.
  - Added the required column `link` to the `avatars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "path",
ADD COLUMN     "link" TEXT NOT NULL;
