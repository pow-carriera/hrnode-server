/*
  Warnings:

  - A unique constraint covering the columns `[lastName,firstName,middleName]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_lastName_firstName_middleName_key" ON "Profile"("lastName", "firstName", "middleName");
