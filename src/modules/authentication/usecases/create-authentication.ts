import { CreateModule } from '../../../shared'
import { GluegunToolbox } from 'gluegun'

export namespace CreateAuthenticatior {
  export type Request = CreateModule.Request

  export type Response = CreateModule.Response<string>

  export interface Execute {
    execute(data: Request): Promise<Response>
  }
}

export class CreateAuthentication implements CreateAuthenticatior.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: CreateAuthenticatior.Request
  ): Promise<CreateAuthenticatior.Response> {
    try {
      await Promise.all(
        data.actions.map(action =>
          this.toolbox.template.generate({ template: action.template })
        )
      )

      await this.toolbox.system.spawn('npm install bcryptjs jsonwebtoken', {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      })

      return {
        success: true,
        data: {
          message: 'Yeah! Now you can sign in your users 🎉'
        }
      }
    } catch {
      return {
        success: false,
        data: {
          message: 'There is an error to generate your auth module, sorry 😔'
        }
      }
    }
  }
}
