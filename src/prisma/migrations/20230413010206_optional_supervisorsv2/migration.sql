-- DropIndex
DROP INDEX "Profile_lastName_firstName_middleName_key";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "supervisor" DROP NOT NULL;
