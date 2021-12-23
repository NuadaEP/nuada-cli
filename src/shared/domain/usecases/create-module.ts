import { Actions, Processor } from '../models'

export namespace CreateModule {
  export type Request = {
    actions: Actions
  }

  export type Response = Processor

  export interface Execute {
    execute(data: CreateModule.Request): Promise<CreateModule.Response>
  }
}
