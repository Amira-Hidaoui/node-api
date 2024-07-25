const express = require("express");
const {
  getAllutilisateurs,
  createutilisateurs,
  getOneutilisateurs,
  updateutilisateurs,
  deleteutilisateurs,
} = require("../controllers/utilisateurs");
const router = express.Router();

router.get("/utilisateurs", getAllutilisateurs);
router.post("/utilisateurs", createutilisateurs);
router.get("/utilisateurs/:utilisateurID", getOneutilisateurs);
router.put("/utilisateurs/:utilisateurID", updateutilisateurs);
router.delete("/utilisateurs/:utilisateurID", deleteutilisateurs);

module.exports = router;
