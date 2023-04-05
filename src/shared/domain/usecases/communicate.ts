import { GluegunToolbox } from 'gluegun';

export namespace Communicate {
  export type Request = {
    type: 'error' | 'success' | 'warning';
    message: string;
  };

  export type Response = void;

  export interface Execute {
    toolbox: GluegunToolbox;
    execute(data: Communicate.Request): Communicate.Response;
  }
}
