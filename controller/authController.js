import User from '../models/Users.js';
import StatusCodes from 'http-status-codes';

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const register = async (req, res, next) => {
  //having access to req.body/json is from our app.use(express.json()) middleware
  const { email, name, password } = req.body;
  if (!name || !email || !password)
    throw new CustomAPIError('Please provide all the values');

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
