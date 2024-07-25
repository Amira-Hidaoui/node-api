const { getConnection, getSql } = require("../database/connection");
const { fichierNavitte } = require("../database/querys");

exports.getAllfichierNavitte = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    const pool = await getConnection();
    const result = await pool.request().query(fichierNavitte.getAll); // Exécuter la requête pour obtenir tous les enregistrements de la table
    res.set(
      "Content-Range",
      `fichierNavitte ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    );
    res.json(result.recordset); // Envoyer les enregistrements récupérés en réponse JSON
  } catch (error) {
    res.status(500).send(error.message); // Envoyer le message d'erreur en réponse et définir le statut HTTP à 500
  }
};
exports.createfichierNavitte = async (req, res) => {
  const { id, NFn, facture, dateFacture, nomFournisseur } = req.body;

  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("id", getSql().Int, id) // Setting input parameters for 'nom'
      .input("NFn", getSql().Int, NFn) // Setting input parameters for 'rib'
      .input("dateFacture", getSql().Date, dateFacture)
      .input("nomFournisseur", getSql().VarChar, nomFournisseur)
      .input("facture", getSql().VarChar, facture)
      .query(fichierNavitte.create); // Executing query to create new record
    res.status(200).json({ id, NFn, facture, dateFacture, nomFournisseur });
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};
exports.getOnefichierNavitte = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id) // Setting input parameter for 'id'
      .query(fichierNavitte.getOne); // Executing query to retrieve single record

    //res.set("Content-Range", `ribAtner 0-1/1`); // Setting Content-Range header

    res.json(result.recordset[0]); // Sending JSON response with retrieved record
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};

exports.updatefichierNavitte = async (req, res) => {
  const { NFn, facture, dateFacture, nomFournisseur } = req.body; // Destructuring request body
  if (
    NFn == null ||
    facture == null ||
    dateFacture == null ||
    nomFournisseur == null
  ) {
    return res.status(400).json({ error: "all field is required" }); // Checking for required fields
  }
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("facture", getSql().VarChar, facture) // Setting input parameters for 'nom'
      .input("dateFacture", getSql().Date, dateFacture) // Setting input parameters for 'nom'
      .input("nomFournisseur", getSql().VarChar, nomFournisseur) // Setting input parameters for 'nom'
      .input("id", getSql().Int, req.params.id) // Setting input parameters for 'id'
      .input("NFn", getSql().Int, NFn) // Setting input parameters for 'id'
      .query(fichierNavitte.update); // Executing query to update record

    res.json({
      NFn,
      facture,
      dateFacture,
      nomFournisseur,
      id: req.params.id,
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};

exports.deletefichierNavitte = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("id", getSql().Int, req.params.id) // Setting input parameters for 'id'
      .query(fichierNavitte.delete); // Executing query to update record

    res.json({
      message:
        "le fichierNavitte avec le code : " + req.params.id + " est supprimé",
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};
