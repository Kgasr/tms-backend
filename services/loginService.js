const { sql, poolPromise } = require("../services/dbService");

// Login validation with database
const login = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('UserId', sql.NVarChar(50), data.userId);
        request.input('Password', sql.NVarChar(500), data.password);
        return await request.execute('uspCheckLogin');  
    } catch (err) {
        return {status: 500,  message: 'Internal Server Error' };
    }
}

module.exports = {login} ;



