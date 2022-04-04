import { GluegunToolbox } from 'gluegun'
import { CreateModule } from '../../../shared'

export class CreateHttpClient implements CreateModule.Execute {
  constructor (private readonly toolbox: GluegunToolbox) {}

  public async execute (
    { actions }: CreateModule.Request
  ): Promise<CreateModule.Response> {
    try {
      await Promise.all(actions.map(this.toolbox.template.generate))

      await this.toolbox.system.spawn('npm install axios', {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      })

      return {
        success: true,
        data: {
          message: 'Yeeah! Now you can make HTTP requests 🎉'
        }
      }
    } catch {
      return {
        success: false,
        data: {
          message:
            'There is an error to generate your HTTP client module, sorry 😔'
        }
      }
    }
  }
}
