const { Client } = require('pg');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { response } = require('express');

config();

const verifyJWT = (request, response, next) => {
  try {
    const token = request.headers['authorization'].split(' ')[1];
    if (!token) return response.sendStatus(403);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    request.user = decoded;
    next();
  } catch (error) {
    response.sendStatus(403);
  }
};

module.exports = verifyJWT;
