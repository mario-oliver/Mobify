/**
 * to utilize ES6 instead of CommonJS for node.js:
 *        - include "type" : "module" in package.json
 * CommonJS syntax is the standard original language
 *      - const express = require('express)
 * But because front end is using ES6, it's worth utilizing ES6 in node js
 */
import express from 'express';
import notFoundMiddleware from './middleware/note-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
const app = express();

app.get('/', (req, res) => {
  throw new Error('error');
  res.send('Welcome');
});

//middleware
app.use(notFoundMiddleware).use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
