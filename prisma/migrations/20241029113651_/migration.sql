/*
  Warnings:

  - Added the required column `userClasses` to the `fileWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fileWork` ADD COLUMN `userClasses` ENUM('X', 'XI', 'XII') NOT NULL;
