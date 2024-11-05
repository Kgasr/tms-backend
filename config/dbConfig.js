require('dotenv').config();

// Connection String for SQL Server
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',  // Convert to boolean
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true'  // Convert to boolean
    }
};

module.exports = dbConfig;