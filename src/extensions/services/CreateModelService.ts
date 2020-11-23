import { GluegunToolbox } from 'gluegun';

import HasNameValidator from '../validators/HasNameValidator';
import ExtraValuesValidator from '../validators/ExtraValuesValidator';
import HasDependenciesValidator from '../validators/HasDependenciesValodator';

import IParamsDTO from './dtos/IParamsDTO';

export default class CreateModelService {
  private readonly toolbox: GluegunToolbox;

  protected readonly hasNameValidator: HasNameValidator;

  protected readonly extraValuesValidator: ExtraValuesValidator;

  protected readonly hasDependenciesValidator: HasDependenciesValidator;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.hasNameValidator = new HasNameValidator(toolbox);
    this.extraValuesValidator = new ExtraValuesValidator(toolbox);
    this.hasDependenciesValidator = new HasDependenciesValidator(toolbox);
  }

  public async execute({ name, params }: IParamsDTO): Promise<void> {
    try {
      const nameCapitalized = await this.hasNameValidator.execute(name);
      const schemas = this.extraValuesValidator.execute(params);

      if (!nameCapitalized) {
        this.toolbox.error('Model name must be specified');
        return;
      }

      if (schemas.length === 0) {
        this.toolbox.error(
          'Fields and types must be specified to create a model',
        );
        this.toolbox.warning(
          `Try something like this: fieldName:type [${this.extraValuesValidator.types.join(
            ' | ',
          )}]`,
        );
        return;
      }

      await this.toolbox.template.generate({
        template: 'src/app/models/model.js.ejs',
        target: `src/app/models/${nameCapitalized}Model.js`,
        props: {
          name: `${nameCapitalized}`,
          fields: schemas,
        },
      });

      await this.toolbox.createValidator(name, params, false);

      this.toolbox.success(
        `Model ${nameCapitalized}Model generated successfuly`,
      );
    } catch ({ message }) {
      this.toolbox.error(message);
    }
  }
}
