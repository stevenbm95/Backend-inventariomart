/*
  Warnings:

  - You are about to drop the column `quantity` on the `drink` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `stock` to the `Drink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `drink` DROP COLUMN `quantity`,
    ADD COLUMN `stock` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending';
