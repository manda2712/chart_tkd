-- CreateTable
CREATE TABLE "AnggaranTKD" (
    "id" SERIAL NOT NULL,
    "jenis_tkd" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "semula" BIGINT,
    "menjadi" BIGINT,
    "pagu" BIGINT,
    "realisasi" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnggaranTKD_pkey" PRIMARY KEY ("id")
);
