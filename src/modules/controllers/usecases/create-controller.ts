import { GluegunToolbox } from 'gluegun';
import { CreateModule } from '../../../shared';

export class CreateController implements CreateModule.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute({
    actions,
    name,
  }: CreateModule.Request): Promise<CreateModule.Response> {
    await Promise.all(actions.map(this.toolbox.template.generate));

    return {
      success: true,
      data: {
        message: `Yeah! We create the controller ${name} 🎉`,
      },
    };
  }
}
