import { Actions, Processor } from '../models';

export namespace CreateModule {
  export type Request = {
    actions: Actions;
    name?: string;
  };

  export type Response<T> = Processor<T>;

  export interface Execute {
    execute<T>(data: Request): Promise<Response<T>>;
  }
}
