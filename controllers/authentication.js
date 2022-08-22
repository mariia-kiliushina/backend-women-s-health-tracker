const { Client } = require('pg');
const { config } = require('dotenv');
const express = require('express');
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

const handleLogin = async (request, response) => {
  const { login, password } = request.body;
  let foundUser;
  try {
    client.query(`SELECT * from ${tableName} where login = $1`, [login], (error, result) => {
      if (!error) {
        console.log('result');
      } else {
        return response.status(401).json({ message: 'Login is incorrect' });
      }
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  try {
    const verifiedPassword = await bcrypt.compare(password, password);

    if (!verifiedPassword) return response.status(401).json({ message: 'Password is incorrect' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
  return response.json({ success: `User ${login} was authorized` });
};

module.exports = { handleLogin };
