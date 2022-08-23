const { Client } = require('pg');
const { config } = require('dotenv');

const bcrypt = require('bcrypt');

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

const handleNewUser = async (request, response) => {
  const { login, password } = request.body;
  if (!login || !password)
    return response.status(400).json({ message: 'Login and password are required' });

  try {
    foundUsers = await client.query(`SELECT * from ${tableName} where login = $1`, [login]);
    foundUser = await foundUsers.rows[0];
    if (foundUser !== undefined)
      return response.status(409).json({ message: `User with login ${login} already exists` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 7);
    await client.query(`INSERT INTO ${tableName} (login, password) VALUES ($1,$2)`, [
      login,
      hashedPassword,
    ]);

    response.status(201).json({ success: `New user ${login} was created` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
