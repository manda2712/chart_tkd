/*
  Warnings:

  - You are about to alter the column `semula` on the `AnggaranTKD` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `menjadi` on the `AnggaranTKD` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `pagu` on the `AnggaranTKD` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "AnggaranTKD" ALTER COLUMN "semula" SET DATA TYPE BIGINT,
ALTER COLUMN "menjadi" SET DATA TYPE BIGINT,
ALTER COLUMN "pagu" SET DATA TYPE BIGINT;
