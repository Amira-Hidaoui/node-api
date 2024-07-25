const express = require("express");
const {
  getAllfichierNavitte,
  createfichierNavitte,
  getOnefichierNavitte,
  updatefichierNavitte,
  deletefichierNavitte,
} = require("../controllers/fichierNavitte");
const router = express.Router();

router.get("/fichierNavitte", getAllfichierNavitte);
router.post("/fichierNavitte", createfichierNavitte);
router.get("/fichierNavitte/:id", getOnefichierNavitte);
router.put("/fichierNavitte/:id", updatefichierNavitte);
router.delete("/fichierNavitte/:id", deletefichierNavitte);
module.exports = router;
