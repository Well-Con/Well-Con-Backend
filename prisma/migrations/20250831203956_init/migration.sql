/*
  Warnings:

  - The `Education` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `Gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" ADD COLUMN     "Gender" TEXT NOT NULL,
DROP COLUMN "Education",
ADD COLUMN     "Education" TEXT[];
