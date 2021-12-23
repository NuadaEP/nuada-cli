import { Actions, Processor } from "../models";

export namespace CreateModel {
  export type Request = {
    actions: Actions
  }

  export type Response = Processor

  export interface Execute {
    execute(data: CreateModel.Request): Promise<CreateModel.Response>
  }
}
