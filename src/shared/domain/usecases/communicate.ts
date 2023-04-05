import { type GluegunToolbox } from 'gluegun';

export namespace Communicate {
  export interface Request {
    type: 'error' | 'success' | 'warning';
    message: string;
  }

  export type Response = any;

  export interface Execute {
    toolbox: GluegunToolbox;
    execute: (data: Communicate.Request) => Communicate.Response;
  }
}
