/*
  Warnings:

  - You are about to alter the column `genre` on the `fileWork` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `fileWork` MODIFY `genre` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Genre` (
    `comment_id` CHAR(36) NOT NULL,
    `Genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
