-- CreateEnum
CREATE TYPE "employmentType" AS ENUM ('FULLTIME', 'PARTTIME', 'INTERN');

-- CreateEnum
CREATE TYPE "department" AS ENUM ('MOBILEDEV', 'WEBDEV', 'MARKETING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "suffix" TEXT,
    "gender" TEXT,
    "birthDate" TEXT,
    "contactNumber" TEXT,
    "contactEmail" TEXT,
    "employmentType" "employmentType" NOT NULL,
    "department" "department" NOT NULL,
    "jobCode" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "supervisor" TEXT NOT NULL,
    "payrollRunType" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
