import { Actions, Processor } from '../models'

export namespace CreateModule {
  export type Request = Actions

  export type Response = Processor

  export interface Execute {
    execute(data: Request): Promise<Response>
  }
}
