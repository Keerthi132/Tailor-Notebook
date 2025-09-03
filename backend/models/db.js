const { Pool } = require('pg'); // Import the Pool class from the pg package

// Create a new pool instance for managing database connections
const pool = new Pool({
  user: 'postgres',        // Replace with your database username
  host: 'localhost',           // Replace with your database host (e.g., localhost)
  database: 'tailor_notebook',    // Replace with your database name
  password: 'password',// Replace with your database password
  port: 5432,                  // Default PostgreSQL port
});

module.exports = pool; // Export the pool object to be used in other files
