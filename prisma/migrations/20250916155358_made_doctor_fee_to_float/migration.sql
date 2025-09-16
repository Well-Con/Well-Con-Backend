/*
  Warnings:

  - The `consultationFee` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "consultationFee",
ADD COLUMN     "consultationFee" DOUBLE PRECISION[];
