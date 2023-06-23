import User from '../models/Users.js';

const register = async (req, res, next) => {
  //having access to req.body/json is from our app.use(express.json()) middleware
  const user = await User.create(req.body);
  res.status(201).json({ user });
  /**
   * removed try catch
   * import 'express-async-errors' allows us to do this behind the scene with their package piping
   */
};
const login = async (req, res) => {
  res.send('login');
};
const updateUser = async (req, res) => {
  res.send('updateUser');
};

export { register, login, updateUser };
