import { CreateModule } from '../../../shared'
import { GluegunToolbox } from 'gluegun'

export class CreateAuthentication implements CreateModule.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: CreateModule.Request
  ): Promise<CreateModule.Response> {
    try {
      await Promise.all(
        data.map(action => this.toolbox.template.generate(action))
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
