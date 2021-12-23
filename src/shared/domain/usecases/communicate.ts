export namespace Comunicate {
  export type Request = {
    type: 'error' | 'sucess' | 'warning'
    message: string
  }

  export type Response = void

  export interface Execute {
    execute(data: Comunicate.Request): Promise<Comunicate.Response>
  }
}
