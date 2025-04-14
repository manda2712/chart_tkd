/*
  Warnings:

  - Added the required column `daerah` to the `AnggaranTKD` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnggaranTKD" ADD COLUMN     "daerah" TEXT NOT NULL;
