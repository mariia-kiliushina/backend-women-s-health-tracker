const { Client } = require('pg');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const generateTokenByLogin = require('../utils/generateTokenByLogin');
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

const handleRefreshToken = async (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(401);

  const refreshToken = cookies.jwt;
  let foundUsers;
  let foundUser;
  try {
    foundUsers = await client.query(`SELECT * from ${tableName} where refresh_token = $1`, [
      refreshToken,
    ]);

    if (foundUsers === undefined)
      return response.status(401).json({ message: 'Token does not match' });

    foundUser = await foundUsers.rows[0];
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  try {
    const decodedFromToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

    if (decodedFromToken.login === undefined || decodedFromToken.login !== foundUser.login)
      return response.status(403).json({ message: 'Incorrect token' });

    const accessToken = generateTokenByLogin(
      decodedFromToken.login,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      '600s'
    );
    response.json(accessToken);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { handleRefreshToken };
