/*
  Warnings:

  - You are about to drop the column `Education` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `Experties` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `RegistrationNo` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `consultationType` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[registrationNo]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `dateTime` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `registrationNo` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `age` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNo` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."address" DROP CONSTRAINT "address_userId_fkey";

-- DropIndex
DROP INDEX "public"."Doctor_RegistrationNo_key";

-- AlterTable
ALTER TABLE "public"."Appointment" DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."AppointmentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "Education",
DROP COLUMN "Experties",
DROP COLUMN "RegistrationNo",
DROP COLUMN "consultationType",
ADD COLUMN     "consultationTypes" TEXT[],
ADD COLUMN     "education" TEXT[],
ADD COLUMN     "expertise" TEXT[],
ADD COLUMN     "registrationNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "Gender",
ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "phoneNo" SET NOT NULL,
ALTER COLUMN "phoneNo" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL;

-- DropTable
DROP TABLE "public"."address";

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "buildingNo" TEXT,
    "type" TEXT,
    "street" TEXT,
    "area" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_registrationNo_key" ON "public"."Doctor"("registrationNo");

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
