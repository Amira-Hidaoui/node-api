const express = require("express");
const {
  getAllChantier,
  createChantier,
  getOneChantier,
  updateChantier,
  deleteChantier,
} = require("../controllers/chantier");
const router = express.Router();

router.get("/chantier", getAllChantier);
router.post("/chantier", createChantier);
router.get("/chantier/:id", getOneChantier);
router.put("/chantier/:id", updateChantier);
router.delete("/chantier/:id", deleteChantier);

module.exports = router;
