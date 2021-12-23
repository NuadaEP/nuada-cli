import { CreateModule } from '@shared/domain'
import { GluegunToolbox } from 'gluegun'

export class CreateAuthentication implements CreateModule.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: CreateModule.Request
  ): Promise<CreateModule.Response> {
    try {
      await this.toolbox.system.spawn('npm install bcryptjs jsonwebtoken', {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      })

      await Promise.all(
        data.actions.map(action => this.toolbox.template.generate(action))
      )

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        data: {
          message: 'Houve um erro ao gerar o módulo de autenticação'
        }
      }
    }
  }
}
