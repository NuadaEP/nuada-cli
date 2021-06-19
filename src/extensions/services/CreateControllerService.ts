import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

import HasNameValidator from '../validators/HasNameValidator';
import BaseService from './BaseService';

import IFullDTO from './dtos/IFullDTO';

export default class CreateControllerService extends BaseService {
  protected readonly hasNameValidator: HasNameValidator;

  constructor(toolbox: GluegunToolbox) {
    super(toolbox);

    this.hasNameValidator = new HasNameValidator(toolbox);

    this.dispatchMessage = new DispatchMessages(toolbox);
  }

  public async execute({ name, full = false }: IFullDTO): Promise<void> {
    const nameCapitalized = await this.hasNameValidator.execute(name);

    if (!nameCapitalized) return;

    await this.toolbox.template.generate({
      template: full
        ? 'src/app/controllers/scaffoldController.js.ejs'
        : 'src/app/controllers/controller.js.ejs',
      target: `src/app/controllers/${nameCapitalized}Controller.js`,
      props: { name: `${nameCapitalized}` },
    });

    this.dispatchMessage.success(
      `Controller ${nameCapitalized}Controller generated successfuly`,
    );
  }
}
