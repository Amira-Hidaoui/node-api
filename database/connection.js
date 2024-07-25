// Import required modules
const sql = require("mssql"); // Standard mssql module
const sql2 = require("mssql/msnodesqlv8"); // mssql module with msnodesqlv8 driver ** to install use ==> npm i msnodesqlv8
require("msnodesqlv8"); // Ensure msnodesqlv8 driver is loaded

// Database connection settings using msnodesqlv8 driver
const dbSettings2 = {
  database: "DB-FN", // Database name
  server: "DESKTOP-11G60CE\\MSSQLSERVER3", // Database server name or IP
  driver: "msnodesqlv8", // Driver to use (msnodesqlv8 for SQL Server)
  options: {
    trustedConnection: true, // Use Windows authentication
  },
};

// Database connection settings using standard SQL Server authentication
const dbSettings = {
  user: "saisie.erp", // Database username
  password: "Sage123+", // Database password
  server: "192.168.1.202", // Database server IP address
  database: "ATNER_DW", // Database name
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // Timeout in milliseconds to remove idle connections from the pool
  },
  options: {
    encrypt: false, // Whether to encrypt the connection (false for development)
    trustServerCertificate: true, // Whether to trust the server certificate (true for development)
  },
};

// Export function to establish database connection using standard authentication
exports.getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings2); // Establish connection using dbSettings
    return pool; // Return the connection pool
  } catch (error) {
    console.error(error); // Log any errors that occur during connection
  }
};

// Export function to access the mssql module with msnodesqlv8 driver
exports.getSql = () => {
  return sql2; // Return the mssql module for direct access if needed
};
