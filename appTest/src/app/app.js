const Dotenv = require('dotenv');
const Express = require('express');
const Mongoose = require('mongoose');

Dotenv.config();

const DatabaseConfig = require('../config/database');
const Routes = require('./routes');

class App {
  constructor() {
    this.server = Express();

    this.database();
    this.middwares();
    this.routes();
    this.exception();
  }

  database() {
    Mongoose.connect(DatabaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  }

  middwares() {
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }

  exception() {
    this.server.use(async (err, req, res, next) => res.status(err.status || 500).json({ error: 'Internal Server Error' }));
  }
}

module.exports = new App().server;
