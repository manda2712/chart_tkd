const prisma = require('../db')

// Menambahkan data anggaran TKD
async function insertTKD (data) {
  return await prisma.anggaranTKD.create({ data })
}

// Mengambil semua data TKD berdasarkan tahun & daerah
async function findTKDByYear (tahun, daerah) {
  const where = {}
  if (tahun) where.tahun = parseInt(tahun)
  if (daerah) where.daerah = daerah

  return await prisma.anggaranTKD.findMany({
    where,
    orderBy: { jenis_tkd: 'asc' }
  })
}

// Mendapatkan data untuk grafik efisiensi pencadangan per daerah
async function getEfisiensiGrafik (tahun, daerah) {
  const data = await findTKDByYear(tahun, daerah)

  return data.map(item => {
    const pencadangan =
      item.semula && item.menjadi
        ? BigInt(item.semula) - BigInt(item.menjadi)
        : BigInt(0)

    const efisiensi =
      item.semula && pencadangan > 0n
        ? (Number(pencadangan) / Number(item.semula)) * 100
        : 0

    return {
      jenis_tkd: item.jenis_tkd,
      pencadangan: Number(pencadangan),
      pagu: Number(item.pagu ?? 0n),
      efisiensi: Number(efisiensi.toFixed(2))
    }
  })
}

// Mendapatkan data untuk grafik realisasi per daerah
async function getRealisasiGrafik (tahun, daerah) {
  const data = await findTKDByYear(tahun, daerah)

  return data.map(item => {
    const pagu = Number(item.pagu ?? 0n)
    const realisasi = Number(item.realisasi ?? 0)
    const sisa_pagu = pagu - realisasi // 👉 Tambahkan ini
    const persentase = pagu > 0 ? (realisasi / pagu) * 100 : 0

    return {
      jenis_tkd: item.jenis_tkd,
      pagu,
      realisasi,
      sisa_pagu,
      persentase: Number(persentase.toFixed(2))
    }
  })
}

async function deletedChartById (id) {
  await prisma.anggaranTKD.delete({
    where: { id: parseInt(id) }
  })
}

module.exports = {
  insertTKD,
  findTKDByYear,
  getEfisiensiGrafik,
  getRealisasiGrafik,
  deletedChartById
}
