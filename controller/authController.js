import User from '../models/Users.js';
import StatusCodes from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res, next) => {
  //having access to req.body/json is from our app.use(express.json()) middleware
  const { email, name, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError('Please provide all the values');

  /**
   * Error with duplicate email code
   */
  const userWithEmailAlreadyExists = User.findOne({ email });
  console.log(email, userWithEmailAlreadyExists);
  if (userWithEmailAlreadyExists)
    throw new BadRequestError('Email is already in use');

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
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
