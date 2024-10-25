/*
  Warnings:

  - The values [SuperAdmin] on the enum `fileWork_userRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [SuperAdmin] on the enum `fileWork_userRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('GURU', 'ADMIN', 'SUPERADMIN', 'VALIDATOR', 'DELETE') NOT NULL DEFAULT 'GURU';

-- AlterTable
ALTER TABLE `fileWork` MODIFY `userRole` ENUM('GURU', 'ADMIN', 'SUPERADMIN', 'VALIDATOR', 'DELETE') NOT NULL DEFAULT 'GURU';
