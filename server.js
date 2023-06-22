/**
 * to utilize ES6 instead of CommonJS for node.js:
 *        - include "type" : "module" in package.json
 * CommonJS syntax is the standard original language
 *      - const express = require('express)
 * But because front end is using ES6, it's worth utilizing ES6 in node js
 */
import express from 'express';
const app = express();

import connectDB from './db/connect.js';

import notFoundMiddleware from './middleware/note-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import dotenv from 'dotenv';
dotenv.config();

app.get('/', (req, res) => {
  throw new Error('error');
  res.send('Welcome');
});

//middleware
app.use(notFoundMiddleware).use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const db_url = process.env.MONGO_URL;
console.log(`db string ${db_url}`);

const start = async () => {
  try {
    //need to switch db_url to work with the dotenv file (port is also not working)
    //TODO: once fixed, correct the gitignore to allow /db to be pushed to git
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
