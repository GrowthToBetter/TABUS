/*
  Warnings:

  - You are about to alter the column `genre` on the `fileWork` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(6))`.

*/
-- AlterTable
ALTER TABLE `fileWork` MODIFY `genre` ENUM('Sastra', 'Seni', 'Fantasy', 'ScienceFiction') NULL;
