/*
  Warnings:

  - You are about to drop the column `jobCode` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `payrollRunType` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "jobCode",
DROP COLUMN "payrollRunType";
