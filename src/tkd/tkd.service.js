const {
  insertTKD,
  findTKDByYear,
  deletedChartById
} = require('./tkd.repository')

// Service untuk membuat data baru
async function createTKD (data) {
  try {
    const result = await insertTKD(data)
    return result
  } catch (error) {
    console.error('Error saat membuat data TKD:', error)
    throw new Error('Gagal Membuat Data TKD')
  }
}

// Service untuk grafik efisiensi (per tahun dan daerah)
async function getEfisiensiTKD (tahun, daerah) {
  try {
    const data = await findTKDByYear(tahun, daerah)

    const hasil = data.map(item => {
      const semula = item.semula ? Number(item.semula) : 0
      const menjadi = item.menjadi ? Number(item.menjadi) : 0
      const pencadangan = semula - menjadi

      const efisiensi = semula > 0 ? (pencadangan / semula) * 100 : 0

      return {
        jenis_tkd: item.jenis_tkd,
        semula,
        menjadi,
        pencadangan,
        pagu: item.pagu ? Number(item.pagu) : 0,
        efisiensi: Number(efisiensi.toFixed(2))
      }
    })

    return hasil
  } catch (error) {
    console.error('Error mengambil efisiensi TKD:', error)
    throw new Error('Gagal Mengambil Data Efisiensi')
  }
}

// Service untuk grafik realisasi (per tahun dan daerah)
async function getRealisasiTKD (tahun, daerah) {
  try {
    const data = await findTKDByYear(tahun, daerah)

    const hasil = data.map(item => {
      const pagu = item.pagu ? Number(item.pagu) : 0
      const realisasi = typeof item.realisasi === 'number' ? item.realisasi : 0
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

    return hasil
  } catch (error) {
    console.error('Error mengambil realisasi TKD:', error)
    throw new Error('Gagal Mengambil Data Realisasi')
  }
}

async function removeChartById (id) {
  try {
    const result = await deletedChartById(id)
    return result
  } catch (error) {
    console.error('Error saat menghapus data TKD:', error)
    throw new Error('Gagal Menghapus Data TKD')
  }
}

module.exports = {
  createTKD,
  getEfisiensiTKD,
  getRealisasiTKD,
  removeChartById
}
