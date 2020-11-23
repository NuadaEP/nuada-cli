import { GluegunToolbox } from 'gluegun';

import HasNameValidator from '../Validators/HasNameValidator';
import ExtraValuesValidator from '../Validators/ExtraValuesValidator';
import HasDependenciesValidator from '../Validators/HasDependenciesValodator';

import IValidatorDTO from './dtos/IValidatorDTO';

export default class Validator {
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

  async execute({ name, params, single = true }: IValidatorDTO): Promise<void> {
    try {
      const nameCapitalized = await this.hasNameValidator.execute(name);
      const schemas = this.extraValuesValidator.execute(params);

      const schemaWithoutRelational = schemas.filter(item => {
        if (!item) return false;

        const relational = item.type.search('=');

        return relational === -1;
      });

      if (schemaWithoutRelational.length === 0) {
        this.toolbox.error(
          'Fields and types must be specified to create a validator',
        );
        this.toolbox.warning(
          `Try something like this: fieldName:type [${this.extraValuesValidator.types.join(
            ' | ',
          )}]`,
        );
        return;
      }

      await this.toolbox.template.generate({
        template: 'src/app/validators/validator.js.ejs',
        target: `src/app/validators/${nameCapitalized}Validator.js`,
        props: {
          name: `${nameCapitalized}`,
          fields: schemaWithoutRelational,
        },
      });

      this.toolbox.success(
        `Validator ${nameCapitalized}Validator generated successfuly`,
      );
    } catch ({ message }) {
      if (single) this.toolbox.error(message);
    }
  }
}
