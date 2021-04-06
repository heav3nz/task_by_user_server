const sql = require('mssql');

// Configuración de LifeDB
const dbProps = require('../clients/lifeserver.json');
const lifePool = new sql.ConnectionPool(dbProps);

// Conexión de Microsoft SQL Server
const LIFEMSSSQLCN = lifePool.connect();

lifePool.on('error', err => {
    console.log(err);
});

// Conexión LIFE
// RAW QUERY
async function raw(query) {
    await LIFEMSSSQLCN;
    try {
        var rawRequest = lifePool.request();
        var results = await rawRequest.query(query);
        return results;
    } catch (err) {
        return err;
    }
}

// STORED PROCEDURE
async function sp(spname, params) {
    await LIFEMSSSQLCN;
    try {
        var spRequest = lifePool.request();
        if (Array.isArray(params)) {
            params.forEach((param) => {
                spRequest.input(param.name, param.value);
            });
        }
        var results = await spRequest.execute(spname);
        return results;
    } catch (err) {
        return err
    }
}


module.exports = { raw, sp, sql };