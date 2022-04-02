import { GluegunToolbox } from 'gluegun'
import { CreateModule } from '../../../shared'

export class CreateHttpClient implements CreateModule.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: CreateModule.Request
  ): Promise<CreateModule.Response> {
    try {
      await this.toolbox.system.spawn('npm install axios', {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      })

      await Promise.all(data.map(this.toolbox.template.generate))

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
          message: 'There are an error to generate your HTTP client 😔'
        }
      }
    }
  }
}
