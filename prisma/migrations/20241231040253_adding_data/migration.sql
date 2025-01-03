/*
  Warnings:

  - You are about to drop the `_comment_file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_comment_file` DROP FOREIGN KEY `_comment_file_A_fkey`;

-- DropForeignKey
ALTER TABLE `_comment_file` DROP FOREIGN KEY `_comment_file_B_fkey`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `fileId` VARCHAR(191) NULL,
    ADD COLUMN `fileSugestId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_comment_file`;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `fileWork`(`file_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_fileSugestId_fkey` FOREIGN KEY (`fileSugestId`) REFERENCES `fileWork`(`file_id`) ON DELETE SET NULL ON UPDATE CASCADE;
