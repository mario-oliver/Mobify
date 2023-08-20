/**
 * to utilize ES6 instead of CommonJS for node.js:
 *        - include "type" : "module" in package.json
 * CommonJS syntax is the standard original language
 *      - const express = require('express)
 * But because front end is using ES6, it's worth utilizing ES6 in node js
 */
import express from 'express';
const app = express();

import 'express-async-errors';

//setup of env file
import dotenv from 'dotenv';
dotenv.config();

//db and authenticate user
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

//middleware setup
import notFoundMiddleware from './middleware/note-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import morgan from 'morgan';
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

//middleware for accessing json within the controllers (for post requests this is how that data is passed)
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRoutes);

//middleware
app.use(notFoundMiddleware).use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const db_url = process.env.MONGO_URL;
console.log(`db string ${db_url}`);

const start = async () => {
  try {
    await connectDB(db_url);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
