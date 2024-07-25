const { getConnection, getSql } = require("../database/connection"); // Importing getConnection and getSql functions from database/connection
const { chantier } = require("../database/querys"); // Importing ribAtner queries from database/querys

exports.getAllChantier = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    //   let sort = req.query.sort || '["id" , "ASC"]'; // Default sort if not provided
    //   let filter = req.query.filter || "{}"; // Default filter if not provided

    //   range = JSON.parse(range); // Parsing range parameter
    //   sort = JSON.parse(sort); // Parsing sort parameter
    //   filter = JSON.parse(filter); // Parsing filter parameter

    //   console.log(filter); // Logging filter to console

    //   let queryFilter = "";
    //   if (filter.nom) {
    //     queryFilter += ` and nom like('%${filter.nom}%')`; // Adding filter condition for 'nom'
    //   }
    //   if (filter.rib) {
    //     queryFilter += ` and rib like('%${filter.rib}%')`; // Adding filter condition for 'rib'
    //   }

    const pool = await getConnection(); // Establishing a database connection
    //   console.log(`${ribAtner.getAll} ${queryFilter} Order by ${sort[0]} ${
    //     sort[1]
    //   }
    //       OFFSET ${range[0]} ROWS FETCH NEXT ${
    //     range[1] + 1 - range[0]
    //   } ROWS ONLY`); // Logging SQL query with parameters
    //   const result = await pool.request().query(
    //     `${ribAtner.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
    //       OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    //   ); // Executing query to retrieve records
    const result = await pool.request().query(chantier.getAll);
    res.set(
      "Content-Range",
      `chantier ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    ); // Setting Content-Range header

    res.json(result.recordset); // Sending JSON response with retrieved records
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};

exports.createChantier = async (req, res) => {
  const { id, nom } = req.body;

  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("id", getSql().Int, id) // Setting input parameters for 'nom'
      .input("nom", getSql().VarChar, nom) // Setting input parameters for 'rib'
      .query(chantier.create); // Executing query to create new record
    res.status(200).json({ id, nom });
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};

exports.getOneChantier = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id) // Setting input parameter for 'id'
      .query(chantier.getOne); // Executing query to retrieve single record

    res.set("Content-Range", `ribAtner 0-1/1`); // Setting Content-Range header

    res.json(result.recordset[0]); // Sending JSON response with retrieved record
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};

exports.updateChantier = async (req, res) => {
  const { nom } = req.body; // Destructuring request body
  if (nom == null) {
    return res.status(400).json({ error: "all field is required" }); // Checking for required fields
  }
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("nom", getSql().VarChar, nom) // Setting input parameters for 'nom'
      .input("id", getSql().Int, req.params.id) // Setting input parameters for 'id'
      .query(chantier.update); // Executing query to update record

    res.json({
      nom,
      id: req.params.id,
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};

exports.deleteChantier = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("id", getSql().Int, req.params.id) // Setting input parameters for 'id'
      .query(chantier.delete); // Executing query to update record

    res.json({
      message: "le chantier avec le code : " + req.params.id + " est supprimé",
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};
