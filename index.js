const express = require('express');
const http = require('http');
const morgan = require('morgan');
const colors = require('colors/safe');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// TODO: test route '/api/noauth' on heroku
// TODO: add tests

// Express App setup
const app = express();
console.log(colors.green(process.env.MONGODB_URI));
// DB Setup
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
// Could close off our API to rest of world on next line in cors parameters
const corsOptions = {
  origin: true,
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
  credentials: true,
  preflightContinue: true
};
app.use(cors());  // Middleware for handling requests coming from different ports
app.use(morgan('combined')); // Middleware for logging
app.use(bodyParser.json({ type: '*/*' })); // Middleware parses incoming requests into JSON
router(app);  // makes our app available to all of our routes

// Server setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log(colors.green('Server listening on', port));
