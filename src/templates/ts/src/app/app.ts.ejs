import dotenv from 'dotenv';
import express, { Request, Response, NextFunction, Express } from 'express';
import Mongoose from 'mongoose';
import Cors from 'cors';

import 'express-async-errors';

dotenv.config();

import DatabaseConfig from '../config/database';
import Routes from './routes';
import AppError from './errors/AppError';

export default class App {
  private server: Express;

  constructor() {
    this.server = express();
  }

  private database() {
    Mongoose.connect(DatabaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }

  private middwares() {
    this.server.use(Cors());
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
  }

  private routes() {
    this.server.use(Routes);
  }

  private exception() {
    this.server.use(async (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.error);
      }

      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    });
  }
}
