/*
  Warnings:

  - You are about to drop the column `handle` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_handle_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "handle";
