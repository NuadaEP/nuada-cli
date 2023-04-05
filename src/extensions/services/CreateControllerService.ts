import { type GluegunToolbox } from 'gluegun';
import { type IDispatchMessages } from '../../helpers';

import HasNameValidator from '../validators/HasNameValidator';
import BaseService from './base/BaseService';

import type IFullDTO from './dtos/IFullDTO';

export default class CreateControllerService extends BaseService {
  protected readonly hasNameValidator: HasNameValidator;

  constructor(toolbox: GluegunToolbox, dispatchMessage: IDispatchMessages) {
    super(toolbox, dispatchMessage);

    this.hasNameValidator = new HasNameValidator(toolbox);
  }

  public async execute({ name, full = false }: IFullDTO): Promise<void> {
    const nameCapitalized = await this.hasNameValidator.execute(name);

    if (typeof nameCapitalized === 'boolean') return;

    await this.toolbox.template.generate({
      template: full
        ? 'src/app/controllers/scaffoldController.ts.ejs'
        : 'src/app/controllers/controller.ts.ejs',
      target: `src/app/controllers/${nameCapitalized}Controller.ts`,
      props: { name: `${nameCapitalized}` },
    });

    this.dispatchMessage.success(
      `Controller ${nameCapitalized}Controller generated successfuly`
    );
  }
}
