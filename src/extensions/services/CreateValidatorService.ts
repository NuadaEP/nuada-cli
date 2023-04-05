import { type GluegunToolbox } from 'gluegun';

import HasNameValidator from '../validators/HasNameValidator';
import ExtraValuesValidator from '../validators/ExtraValuesValidator';
import HasDependenciesValidator from '../validators/HasDependenciesValodator';

import type IValidatorDTO from './dtos/IValidatorDTO';
import BaseService from './base/BaseService';
import { type IDispatchMessages } from '../../helpers';

export default class CreateValidatorService extends BaseService {
  protected readonly hasNameValidator: HasNameValidator;

  protected readonly extraValuesValidator: ExtraValuesValidator;

  protected readonly hasDependenciesValidator: HasDependenciesValidator;

  constructor(toolbox: GluegunToolbox, dispatchMessage: IDispatchMessages) {
    super(toolbox, dispatchMessage);

    this.hasNameValidator = new HasNameValidator(toolbox);
    this.extraValuesValidator = new ExtraValuesValidator(toolbox);
    this.hasDependenciesValidator = new HasDependenciesValidator(toolbox);
  }

  async execute({ name, params }: IValidatorDTO): Promise<void> {
    const nameCapitalized = (await this.hasNameValidator.execute(
      name
    )) as string;
    const schemas = this.extraValuesValidator.execute(params);

    const schemaWithoutRelational = schemas.filter((item) => {
      if (!item) return false;

      const relational = item.type.search('=');

      return relational === -1;
    });

    if (schemaWithoutRelational.length === 0) {
      this.dispatchMessage.error(
        'Fields and types must be specified to create a validator'
      );
      this.dispatchMessage.warning(
        `Try something like this: fieldName:type [${this.extraValuesValidator.types.join(
          ' | '
        )}]`
      );
      return;
    }

    await this.toolbox.template.generate({
      template: 'js/src/app/validators/validator.js.ejs',
      target: `src/app/validators/${nameCapitalized}Validator.js`,
      props: {
        name: `${nameCapitalized}`,
        fields: schemaWithoutRelational,
      },
    });

    this.dispatchMessage.success(
      `Validator ${nameCapitalized}Validator generated successfuly`
    );
  }
}
