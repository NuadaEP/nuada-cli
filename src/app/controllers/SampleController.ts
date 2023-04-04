import { Request, Response } from 'express';

import Sample from '../models/SampleModel';
import SampleValidator from '../validators/SampleValidator';
import AppError from '../errors/AppError';

export default class SampleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const sample = await Sample.find();

    return response.json(sample);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const sample = await Sample.findById(request.params.id);

    return response.json(sample);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      await SampleValidator(request.body, 'store');

      const sample = await Sample.create(request.body);

      return response.json(sample);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      await SampleValidator(request.body, 'update');

      const sample = await Sample.findByIdAndUpdate(req.params.id, request.body);

      return response.json(sample);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    await Sample.findByIdAndDelete(req.params.id);

    return res.send(true);
  }
}
