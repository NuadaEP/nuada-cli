import { Actions, Processor } from '../models';

export namespace CreateModule {
  export type Request = {
    actions: Actions;
    name?: string;
  };

  export type Response<T = any> = Processor<T>;

  export interface Execute {
    execute<T = any>(data: Request): Promise<Response<T>>;
  }
}
