import User from '../models/Users.js';

const register = async (req, res, next) => {
  try {
    //having access to req.body/json is from our app.use(express.json()) middleware
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res) => {
  res.send('login');
};
const updateUser = async (req, res) => {
  res.send('updateUser');
};

export { register, login, updateUser };
