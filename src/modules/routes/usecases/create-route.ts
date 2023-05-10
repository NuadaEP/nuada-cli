import { type GluegunToolbox } from 'gluegun';
import { type CreateModule } from '../../../shared';

export class CreateRoute implements CreateModule.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute({
    actions,
    name,
  }: CreateModule.Request): Promise<CreateModule.Response> {
    try {
      await Promise.all(actions.map(this.toolbox.template.generate));

      return {
        success: true,
        data: {
          message: `Yeah! We create the route ${name} 🎉`,
        },
      };
    } catch {
      return {
        success: false,
        data: {
          message: `Ops! Something went wrong to create your route file for ${name} module`,
        },
      };
    }
  }
}
