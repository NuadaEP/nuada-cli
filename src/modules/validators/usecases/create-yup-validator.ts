import { type GluegunToolbox } from 'gluegun';
import { type CreateModule } from '../../../shared';

export namespace YupValidator {
  export type Request = CreateModule.Request & {
    schemaWithoutRelational: Array<{
      fieldName: string;
      type: string;
    }>;
  };

  export type Response = CreateModule.Response;

  export interface Execute {
    execute: (data: Request) => Promise<Response>;
  }
}

export class CreateYupValidator implements YupValidator.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public async execute(
    data: YupValidator.Request
  ): Promise<YupValidator.Response> {
    try {
      await Promise.all(
        data.actions.map(
          async (action) =>
            await this.toolbox.template.generate({
              template: action.template,
              target: action.target,
              props: {
                name: data.name,
                fields: data.schemaWithoutRelational,
              },
            })
        )
      );

      return {
        success: true,
        data: {
          message: 'Yeah! Now you can validate 🎉',
        },
      };
    } catch {
      return {
        success: false,
        data: {
          message: 'There is an error to generate your validator, sorry 😔',
        },
      };
    }
  }
}
