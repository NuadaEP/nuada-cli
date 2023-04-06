import { type GluegunToolbox } from 'gluegun';
import { type CreateModule } from '../../../shared';

export namespace CreatorModel {
  export type Request = CreateModule.Request & {
    schemas: Array<{
      fieldName: string;
      type: string;
    }>;
  };

  export type Response = CreateModule.Response;

  export interface Execute {
    execute: (data: Request) => Promise<Response>;
  }
}

export class CreateModel implements CreatorModel.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: CreatorModel.Request
  ): Promise<CreatorModel.Response> {
    try {
      await Promise.all(
        data.actions.map(
          async (action) =>
            await this.toolbox.template.generate({
              template: action.template,
              target: action.target,
              props: {
                name: data.name,
                fields: data.schemas,
              },
            })
        )
      );

      return {
        success: true,
        data: {
          message: 'Yeah! Now you can use your model 🎉',
        },
      };
    } catch {
      return {
        success: false,
        data: {
          message: 'There is an error to generate your model, sorry 😔',
        },
      };
    }
  }
}
