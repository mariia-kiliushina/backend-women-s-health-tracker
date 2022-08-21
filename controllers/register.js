const usersDBmock = {
  users: require('../users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromices = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// const handleNewUser = (req, res) => res.send('<h1>Register page</h1>');

const handleNewUser = async (request, response) => {
  const { login, password } = request.body;
  if (!login || !password)
    return response.status(400).json({ message: 'Login and password are required' });

  const duplicate = usersDBmock.users.find((person) => person.login === login);
  if (duplicate) return response.status(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = {
      login: login,
      password: hashedPassword,
    };

    usersDBmock.setUsers([...usersDBmock.users, newUser]);

    await fsPromices.writeFile(
      path.join(__dirname, '..', 'users.json'),
      JSON.stringify(usersDBmock.users)
    );

    response.status(201).json({ sucess: `New user  ${login} was created` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
