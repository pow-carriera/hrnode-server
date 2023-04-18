/*
  Warnings:

  - The `birthDate` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TimeRecord" ALTER COLUMN "recordDate" DROP NOT NULL,
ALTER COLUMN "recordDate" DROP DEFAULT,
ALTER COLUMN "timeIn" DROP NOT NULL,
ALTER COLUMN "timeIn" DROP DEFAULT,
ALTER COLUMN "timeOut" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
