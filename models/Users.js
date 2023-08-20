import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

//set up our hashing function for passwords
/**
- [mongoose middleware](https://mongoosejs.com/docs/middleware.html)
- UserSchema.pre('save',async function(){
  "this" points to instance created by UserSchema
  })
 */
//'save' hook will get triggered only on Users.create() or Users.save()
UserSchema.pre('save', async function () {
  //generate salt - 10 is the number of rounds that is happening
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  //remember "this" points to the current User doc that the schema produces
  // "_id" is the mongoose doc's id for this specific user
  //jwt.sign(payload,secret,options)
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
  //remember "this" points to the current User doc that the schema produces
  //this.password is the hashed password
  //candidatePassword is the password that the user is trying to login with
  //bcrypt.compare(plainTextPassword,hashedPassword)
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
