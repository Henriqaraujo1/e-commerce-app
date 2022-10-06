const Client = require("pg").Pool;
const { DB } = require("../configs/config");

const client = new Client({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT,
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Conectado com Banco");
});

module.exports = client ;
