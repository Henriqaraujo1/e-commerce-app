const client = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const createError = require("http-errors")

const EncryptUtil = require("../utils/bcrypt");
const EncryptUtilInstance = new EncryptUtil();

const emailExists = async (email) => {
  try {
    const data = await client.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (data.rowCount == 0) {
      return false;
    }
    return data.rows[0];
  } catch (err) {
    throw createError(500, "erro Interno")
  }
};

const createUser = async (email, password) => {
  const encryptPassword = await EncryptUtilInstance.encrypt(password);
  const data = await client.query(
    "INSERT INTO users(email, password) VALUES ($1, $2)",
    [email, encryptPassword]
  );

  if (data.rowCount == 0) {
    return false;
  }
  return data.rows[0];
};

const matchPassword = async (email, password) => {
  const userPassword = await client.query(
    "SELECT password FROM users WHERE email= $1",
    [email]
  );
  if (userPassword.rowCount == 0) {
    return false;
  }

  const comparePassword = userPassword.rows[0].password;

  const match = await bcrypt.compare(password, comparePassword);
  // console.log(match)
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

const deleteAllUsers = (req, res) => {
  client.query("DELETE * FROM users");
};

module.exports = {
  emailExists,
  createUser,
  matchPassword,
  getUserById,
  getAllUsers,
};
