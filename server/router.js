'use strict';
const path = require("path");
const express = require('express');
const expressSession = require("express-session");
const codeRoutes = require('./routes/code');
const snippetsRoutes = require('./routes/snippets');
const twilioRoutes = require('./routes/twilio');
const errorMiddleware = require('./errors/middleware');

module.exports = function(app) {
  // mount api routes on to api router
  const apiRouter = express.Router();
  apiRouter.use('/code', codeRoutes);
  apiRouter.use('/twilio', twilioRoutes);
  apiRouter.use('/snippets', snippetsRoutes);
  // mount api router on to app
  app.use('/api', apiRouter);
  // mount middleware to handle errors
  app.use(errorMiddleware)
  // mount catch all route
  if(process.env.NODE_ENV === 'development'){
    app.all("*", (req, res) => res.status(200).send("My Node.js API"));
  }else{
    app.use(express.static(path.join(__dirname, "/../client/build")));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname+'/../client/build/index.html'));
    });
  }
};