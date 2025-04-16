/*
  Warnings:

  - The primary key for the `consumption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `consumption` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `drinkId` on the `consumption` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `consumption` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `drink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `drink` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `inventorychange` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `inventorychange` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `drinkId` on the `inventorychange` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `inventorychange` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `consumption` DROP FOREIGN KEY `Consumption_drinkId_fkey`;

-- DropForeignKey
ALTER TABLE `consumption` DROP FOREIGN KEY `Consumption_userId_fkey`;

-- DropForeignKey
ALTER TABLE `inventorychange` DROP FOREIGN KEY `InventoryChange_drinkId_fkey`;

-- DropForeignKey
ALTER TABLE `inventorychange` DROP FOREIGN KEY `InventoryChange_userId_fkey`;

-- DropIndex
DROP INDEX `Consumption_drinkId_fkey` ON `consumption`;

-- DropIndex
DROP INDEX `Consumption_userId_fkey` ON `consumption`;

-- DropIndex
DROP INDEX `InventoryChange_drinkId_fkey` ON `inventorychange`;

-- DropIndex
DROP INDEX `InventoryChange_userId_fkey` ON `inventorychange`;

-- AlterTable
ALTER TABLE `consumption` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `drinkId` INTEGER NOT NULL,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `drink` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inventorychange` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `drinkId` INTEGER NOT NULL,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Consumption` ADD CONSTRAINT `Consumption_drinkId_fkey` FOREIGN KEY (`drinkId`) REFERENCES `Drink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumption` ADD CONSTRAINT `Consumption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryChange` ADD CONSTRAINT `InventoryChange_drinkId_fkey` FOREIGN KEY (`drinkId`) REFERENCES `Drink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryChange` ADD CONSTRAINT `InventoryChange_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
