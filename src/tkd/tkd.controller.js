const express = require("express");
const router = express.Router();
const tkdService = require("./tkd.service");
const isAdmin = require("../middleware/adminAuthorize")

// Helper untuk ubah BigInt ke Number/String agar frontend tidak error
function serializeBigInts(data) {
  return data.map(item => ({
    ...item,
    semula: item.semula !== undefined ? Number(item.semula) : undefined,
    menjadi: item.menjadi !== undefined ? Number(item.menjadi) : undefined,
    pencadangan: item.pencadangan !== undefined ? Number(item.pencadangan) : undefined,
    pagu: item.pagu !== undefined ? Number(item.pagu) : undefined,
    realisasi: item.realisasi !== undefined ? Number(item.realisasi) : undefined,
    efisiensi: item.efisiensi !== undefined ? Number(item.efisiensi) : undefined,
    persentase: item.persentase !== undefined ? Number(item.persentase) : undefined
  }));
}

// ➕ Tambah data TKD
router.post('/create', isAdmin, async (req, res) => {
  try {
    const { jenis_tkd, semula, pencadangan, menjadi, pagu, realisasi, tahun, daerah } = req.body;

    if (!jenis_tkd || !tahun || !daerah) {
      return res.status(400).json({ message: "jenis_tkd dan tahun wajib diisi!" });
    }

    const result = await tkdService.createTKD({
      jenis_tkd,
      daerah,
      semula: semula ? BigInt(semula) : 0n,
      menjadi: menjadi ? BigInt(menjadi) : 0n,
      pencadangan: pencadangan? BigInt(pencadangan) : 0n,
      pagu: pagu ? BigInt(pagu) : 0n,
      realisasi: realisasi ? parseFloat(realisasi) : 0,
      tahun: parseInt(tahun)
    });

    res.status(201).json({
      result: {
        ...result,
        semula: result.semula?.toString(),
        menjadi: result.menjadi?.toString(),
        pencadangan: result.pencadangan?.toString(),
        pagu: result.pagu?.toString(),
        realisasi: result.realisasi
      },
      message: "Data TKD berhasil ditambahkan"
    });
  } catch (error) {
    console.error("Gagal menambahkan data TKD:", error);
    res.status(400).json({ error: error.message });
  }
});

// 📊 Data Efisiensi TKD per tahun dan per daerah
router.get('/efisiensi', async (req, res) => {
  try {
    const tahun = req.query.tahun || new Date().getFullYear();
    const daerah = req.query.daerah;

    if (!daerah) {
      return res.status(400).json({ error: "Parameter daerah wajib diisi!" });
    }

    const result = await tkdService.getEfisiensiTKD(tahun, daerah);
    res.status(200).json(serializeBigInts(result));
  } catch (error) {
    console.error("Gagal ambil data efisiensi:", error);
    res.status(500).json({ error: "Gagal Mengambil Data Efisiensi" });
  }
});

// 🧮 Tabel Efisiensi TKD untuk Admin
router.get('/tabel/efisiensi', isAdmin, async (req, res) => {
  try {
    const tahun = req.query.tahun || new Date().getFullYear();
    const daerah = req.query.daerah;

    if (!daerah) {
      return res.status(400).json({ error: "Parameter daerah wajib diisi!" });
    }

    const result = await tkdService.getEfisiensiTKD(tahun, daerah);
    res.status(200).json(result);
  } catch (error) {
    console.error("Gagal ambil data tabel efisiensi:", error);
    res.status(500).json({ error: "Gagal Mengambil Data Tabel Efisiensi" });
  }
});

// 📊 Tabel Realisasi TKD untuk Admin
router.get('/tabel/realisasi', isAdmin, async (req, res) => {
  try {
    const tahun = req.query.tahun || new Date().getFullYear();
    const daerah = req.query.daerah;

    if (!daerah) {
      return res.status(400).json({ error: "Parameter daerah wajib diisi!" });
    }

    const result = await tkdService.getRealisasiTKD(tahun, daerah);
    res.status(200).json(result);
  } catch (error) {
    console.error("Gagal ambil data tabel realisasi:", error);
    res.status(500).json({ error: "Gagal Mengambil Data Tabel Realisasi" });
  }
});


// 📉 Data Realisasi TKD per tahun dan per daerah
router.get('/realisasi', async (req, res) => {
  try {
    const tahun = req.query.tahun || new Date().getFullYear();
    const daerah = req.query.daerah;

    if (!daerah) {
      return res.status(400).json({ error: "Parameter daerah wajib diisi!" });
    }

    const result = await tkdService.getRealisasiTKD(tahun, daerah);
    res.status(200).json(serializeBigInts(result));
  } catch (error) {
    console.error("Gagal ambil data realisasi:", error);
    res.status(500).json({ error: "Gagal Mengambil Data Realisasi" });
  }
});
module.exports = router;
