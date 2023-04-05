import { type Actions, type Processor } from '../models';

export namespace CreateModule {
  export interface Request {
    actions: Actions;
    name?: string;
  }

  export type Response<T = any> = Processor<T>;

  export interface Execute {
    execute: <T = any>(data: Request) => Promise<Response<T>>;
  }
}
