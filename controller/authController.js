const register = (req, res) => {
  res.send('register');
};
const login = (req, res) => {
  res.send('login');
};
const updateUser = (req, res) => {
  res.send('updateUser');
};

export { register, login, updateUser };
