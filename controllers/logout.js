const client = require('../config/client');

let tableName = 'users_table';

const handleLogOut = async (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);
  const refreshToken = cookies.jwt;

  let foundUsers;
  let foundUser;
  try {
    foundUsers = await client.query(`SELECT * from ${tableName} where refresh_token = $1`, [
      refreshToken,
    ]);
    foundUser = await foundUsers.rows[0];

    if (foundUser === undefined) {
      response.clearCookie('jwt', { httpOnly: true });
      return response.sendStatus(204);
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  try {
    await client.query(`Update ${tableName} set refresh_token = null where login = $1`, [
      foundUser.login,
    ]);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  // response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  response.sendStatus(204);
};

module.exports = { handleLogOut };
