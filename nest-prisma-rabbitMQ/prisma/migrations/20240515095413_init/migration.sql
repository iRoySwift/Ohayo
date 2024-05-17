/*
  Warnings:

  - You are about to drop the column `username` on the `log_login` table. All the data in the column will be lost.
  - Added the required column `userId` to the `log_login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log_login` DROP COLUMN `username`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `log_login` ADD CONSTRAINT `log_login_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
