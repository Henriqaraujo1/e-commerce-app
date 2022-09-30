const client = require("../db/dbConfig").default;

const emailExists = async (email) => {
  const data = await client.query(`SELECT * FROM users WHERE email=${email}`);

  if (data.rowCount == 0) return false;

  return data.rows[0];
};

const createUser = async (email, password) => {
  const salt = await bcrypt.genSAlt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log('createuser rodou')

  const data = await client.query(
    "INSERT INTO users(email, password) VALUES ($1, $2,) RETURNING name, email",
    [email, hash]
  );

  if (data.rowCount == 0) 
  {
    console.log('erro de criar usuario')
  };
  return data.rows[0];
};

const matchPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);

  return match;
};

// const getUserById = (req, res) => {
//   console.log('teste function')
//   const id = parseInt(req.params.id)
//   client.query('SELECT * FROM users WHERE id_user = $1', [id], (error, results) => {
//     if(error) {
//       console.log('erro')
//       throw error
//     }
//     res.status(200).json(results.rows)
//   })
// }

module.exports = {
  emailExists,
  createUser,
  matchPassword,
  // getUserById
};
