// provides SQL Pool promise for communication with DB
const  sql = require('mssql');
const dbConfig = require ('../config/dbConfig');
const poolPromise= new sql.ConnectionPool(dbConfig)
        .connect()
        .then(pool => {
            return pool;
        })
        .catch (err=>{
            throw err;
        });
  
module.exports =  {sql, poolPromise};