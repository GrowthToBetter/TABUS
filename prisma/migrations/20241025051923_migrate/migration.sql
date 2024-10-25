/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment_id` on the `Genre` table. All the data in the column will be lost.
  - The required column `genre_id` was added to the `Genre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Genre` DROP PRIMARY KEY,
    DROP COLUMN `comment_id`,
    ADD COLUMN `genre_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`genre_id`);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `SchoolOrigin` VARCHAR(191) NULL,
    MODIFY `role` ENUM('GURU', 'ADMIN', 'SuperAdmin', 'VALIDATOR', 'DELETE') NOT NULL DEFAULT 'GURU';

-- AlterTable
ALTER TABLE `fileWork` MODIFY `userRole` ENUM('GURU', 'ADMIN', 'SuperAdmin', 'VALIDATOR', 'DELETE') NOT NULL DEFAULT 'GURU';

-- CreateTable
CREATE TABLE `SchoolOrigin` (
    `school_id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`school_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
