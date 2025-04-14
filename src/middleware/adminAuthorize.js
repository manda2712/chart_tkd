// Middleware untuk ngecek admin
function isAdmin(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey === "admin_tkd@1") {
      next(); // Lanjut, dia admin
    } else {
      res.status(403).json({ error: "Bukan admin!" });
    }
}
  
module.exports = isAdmin