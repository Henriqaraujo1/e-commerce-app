const client = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const emailExists = async (email) => {
  const data = await client.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (data.rowCount == 0) {
    return false;
  }

  return data.rows[0];
};

const createUser = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log("createuser rodou");

  const data = await client.query(
    "INSERT INTO users(email, password) VALUES ($1, $2)",
    [email, hash]
  );

  if (data.rowCount == 0) {
    console.log("erro de criar usuario");
  }
  return data.rows[0];
};

const matchPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);

  return match;
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(
    `SELECT * FROM users WHERE id_user = ${id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      if (!results.rows[0]) {
        res.status(404).json("Usuario não encontrado");
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const getAllUsers = (req, res) => {
  client.query("SELECT * FROM users ORDER BY id_user ASC", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(201).json(results.rows);
    }
  });
};

module.exports = {
  emailExists,
  createUser,
  matchPassword,
  getUserById,
  getAllUsers,
};
