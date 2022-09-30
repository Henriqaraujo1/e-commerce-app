const Client = require("pg").Pool;
const { DB } = require("../configs/config");

const client = new Client({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT,
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Conectado com Banco")
});

const getUserById = (req, res) => {
  console.log('teste function')
  const id = parseInt(2)
  client.query('SELECT * FROM users WHERE id_user = $1', [id], (error, results) => {
    if(error) {
      console.log('erro')
      throw error
    }
    console.log(results.rows)
    // res.status(200).json(results.rows)
  })
}


module.exports = {client, getUserById};
