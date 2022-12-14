const whiteList = require('../config/whiteList');

const credentials = (request, response, next) => {
  const origin = request.headers.origin;
  if (whiteList.includes(origin)) {
    response.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

module.exports = credentials;
