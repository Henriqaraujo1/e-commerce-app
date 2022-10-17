const client = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const EncryptUtil = require("../utils/bcrypt");
const { createReadStream } = require("fs");
const EncryptUtilInstance = new EncryptUtil();

const emailExists = async (email) => {
  try {
    // const values = email;
    const data = await client.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    console.log(data.rows)
    if (data.rows?.length === 0) {
      return createError(404, "Usuario não encontrado");
    } else {
      return data.rows[0];
    }
  } catch (err) {
    throw createError(500, err);
  }
};

const createUser = async (email, password) => {
  const encryptPassword = await EncryptUtilInstance.encrypt(password);

  const data = await client.query(
    "INSERT INTO users(email, password) VALUES ($1, $2)",
    [email, encryptPassword],
    (err, result) => {
      try {
        if (result.rowCount == 0) {
          return false;
        }
        return result.rows[0];
      } catch (err) {
        throw new Error(err);
      }
    }
  );
  return null;
};

const matchPassword = async (email, password) => {
  try {
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
  } catch (err) {
    throw createError(500, err);
  }
};

const getUserById = (id) => {
  try {
    const value = parseInt(id);
    client.query(
      `SELECT * FROM users WHERE id_user = ${value}`,
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows?.length) {
          return results.rows[0];
        }
      }
    );

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllUsers = async (req, res) => {
  client.query("SELECT * FROM users ORDER BY id_user ASC", (err, results) => {
    if (err) {
      throw err;
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
