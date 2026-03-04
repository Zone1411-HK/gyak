const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'suloskaja',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function latestId() {
    const sql = `
    SELECT id
    FROM kaja
    ORDER BY id DESC
    LIMIT 1;`;
    const [rows] = await pool.execute(sql);
    return rows[0];
}

async function addKaja(nev, ar, finomsag, datum, mennyiseg) {
    try {
        console.log(await latestId()[id]);
        let newId = (await latestId()) == undefined ? 1 : (await latestId()) + 1;
        console.log(newId);
        const sql = `
    INSERT INTO kaja(id, nev, ar, finomsag, lejarat, mennyiseg)
    VALUES(?,?,?,?,?,?)
    `;
        await pool.execute(sql, [newId, nev, ar, finomsag, datum, mennyiseg]);
    } catch (error) {
        console.log(error);
    }
}

async function selectKaja() {
    const sql = `
    SELECT * 
    FROM kaja;
    `;
    const [rows] = await pool.execute(sql);
    return rows;
}

async function removeKaja(id) {
    const sql = `
    DELETE FROM kaja
    WHERE id = ?;
    `;
    await pool.execute(sql, [id]);
}
//!Export
module.exports = {
    selectall,
    addKaja,
    selectKaja,
    removeKaja
};
