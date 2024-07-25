const { getConnection, getSql } = require("../database/connection");
const { utilisateurs } = require("../database/querys");

exports.getAllutilisateurs = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    const pool = await getConnection();
    const result = await pool.request().query(utilisateurs.getAll); // Exécuter la requête pour obtenir tous les enregistrements de la table
    res.set(
      "Content-Range",
      `utilisateurs ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    );
    res.json(result.recordset); // Envoyer les enregistrements récupérés en réponse JSON
  } catch (error) {
    res.status(500).send(error.message); // Envoyer le message d'erreur en réponse et définir le statut HTTP à 500
  }
};
exports.createutilisateurs = async (req, res) => {
  const { utilisateurID, LastName, FirstName, Address, City } = req.body;

  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("utilisateurID", getSql().Int, utilisateurID) // Setting input parameters for 'nom'
      .input("LastName", getSql().VarChar, LastName) // Setting input parameters for 'rib'
      .input("FirstName", getSql().VarChar, FirstName)
      .input("Address", getSql().VarChar, Address)
      .input("City", getSql().VarChar, City)
      .query(utilisateurs.create); // Executing query to create new record
    res.status(200).json({ utilisateurID, LastName, FirstName, Address, City });
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};
exports.getOneutilisateurs = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection
    const result = await pool
      .request()
      .input("utilisateurID", getSql().Int, req.params.utilisateurID) // Setting input parameter for 'id'
      .query(utilisateurs.getOne); // Executing query to retrieve single record

    //res.set("Content-Range", `ribAtner 0-1/1`); // Setting Content-Range header

    res.json(result.recordset[0]); // Sending JSON response with retrieved record
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};

exports.updateutilisateurs = async (req, res) => {
  const { LastName, FirstName, Address, City } = req.body; // Destructuring request body
  if (
    LastName == null ||
    FirstName == null ||
    Address == null ||
    City == null
  ) {
    return res.status(400).json({ error: "all field is required" }); // Checking for required fields
  }
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("LastName", getSql().VarChar, LastName) // Setting input parameters for 'nom'
      .input("FirstName", getSql().VarChar, FirstName) // Setting input parameters for 'nom'
      .input("Address", getSql().VarChar, Address) // Setting input parameters for 'nom'
      .input("utilisateurID", getSql().Int, req.params.utilisateurID) // Setting input parameters for 'id'
      .input("City", getSql().VarChar, City) // Setting input parameters for 'id'
      .query(utilisateurs.update); // Executing query to update record

    res.json({
      LastName,
      FirstName,
      Address,
      City,
      utilisateurID: req.params.utilisateurID,
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};

exports.deleteutilisateurs = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("utilisateurID", getSql().Int, req.params.utilisateurID) // Setting input parameters for 'id'
      .query(utilisateurs.delete); // Executing query to update record

    res.json({
      message:
        "l'utilisateur avec le code : " +
        req.params.utilisateurID +
        " est supprimé",
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};
