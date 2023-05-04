/*
  Warnings:

  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('Pending', 'Cancelled', 'Declined', 'Approved');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "status" "status" NOT NULL;
