const { Client } = require('pg');
const { config } = require('dotenv');
const bcrypt = require('bcrypt');

const { check } = require('express-validator');
const generateTokenByLogin = require('../utils/generateTokenByLogin');

let refreshToken;

config();

const client = new Client({
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: 5432,
  user: process.env.USER_NAME,
});

client.connect();

let tableName = 'users_table';

const handleLogin = async (request, response) => {
  const { login, password } = request.body;
  let foundUsers;
  let foundUser;
  try {
    foundUsers = await client.query(`SELECT * from ${tableName} where login = $1`, [login]);
    foundUser = await foundUsers.rows[0];
    if (foundUser === undefined)
      return response.status(401).json({ message: 'Login is incorrect' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  try {
    const verifiedPassword = await bcrypt.compare(password, foundUser.password);
    if (!verifiedPassword) return response.status(401).json({ message: 'Password is incorrect' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  console.log('login');
  console.log(login);

  const accessToken = generateTokenByLogin(login, process.env.ACCESS_TOKEN_SECRET_KEY, '1d');

  refreshToken = generateTokenByLogin(login, process.env.REFRESH_TOKEN_SECRET_KEY, '1d');

  await client.query(`UPDATE ${tableName} SET refresh_token = $1 WHERE login = $2;`, [
    refreshToken,
    foundUser.login,
  ]);

  ////httpOnly cookie is not available to JS so it's more secure

  response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  response.json({ success: `User ${login} was authorized`, accessToken });
};

module.exports = { handleLogin, refreshToken };
