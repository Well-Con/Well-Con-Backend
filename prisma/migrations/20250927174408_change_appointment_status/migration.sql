/*
  Warnings:

  - The values [PENDING,CONFIRMED,CANCELLED] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `consultationTypes` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `consultationType` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ConsultationType" AS ENUM ('Online', 'InPerson');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."AppointmentStatus_new" AS ENUM ('Pending', 'Confirmed', 'Cancelled', 'Requested');
ALTER TABLE "public"."Appointment" ALTER COLUMN "status" TYPE "public"."AppointmentStatus_new" USING ("status"::text::"public"."AppointmentStatus_new");
ALTER TYPE "public"."AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "public"."AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "public"."AppointmentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Appointment" ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "consultationType" "public"."ConsultationType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "consultationTypes",
ADD COLUMN     "consultationTypes" "public"."ConsultationType"[];

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
