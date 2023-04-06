import { type GluegunToolbox } from 'gluegun';
import { type CreateModule } from '../../../shared';

export class CreateMulterService implements CreateModule.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: CreateModule.Request
  ): Promise<CreateModule.Response> {
    try {
      await Promise.all(data.actions.map(this.toolbox.template.generate));
      await this.toolbox.system.spawn('npm install multer', {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit',
      });

      return {
        success: true,
        data: {
          message: 'Yeah! Now you can upload files 🎉',
        },
      };
    } catch {
      return {
        success: false,
        data: {
          message: 'There is an error to generate your auth module, sorry 😔',
        },
      };
    }
  }
}
