import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 20,
    default: 'LastName',
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: 'DC',
  },
});

export default mongoose.model('User', UserSchema);
