import { GluegunToolbox } from 'gluegun';
import IDispatchMessages from '../../helpers/IDispatchMessages/implementations/IDispatchMessages';

import HasNameValidator from '../validators/HasNameValidator';
import BaseService from './base/BaseService';

import IFullDTO from './dtos/IFullDTO';

export default class CreateRouterService extends BaseService {
  protected readonly hasNameValidator: HasNameValidator;

  constructor(toolbox: GluegunToolbox, dispatchMessage: IDispatchMessages) {
    super(toolbox, dispatchMessage);

    this.hasNameValidator = new HasNameValidator(toolbox);
  }

  public async execute({ name, full = false }: IFullDTO): Promise<void> {
    const nameCapitalized = await this.hasNameValidator.execute(name);

    if (!nameCapitalized) return;

    await this.toolbox.template.generate({
      template: full
        ? 'src/app/routes/scaffold.router.js.ejs'
        : 'src/app/routes/scaffold.router.js.ejs',
      target: `src/app/routes/${name}.router.js`,
      props: { name: `${name}`, nameCapitalized },
    });

    this.dispatchMessage.success(`Route ${name}.router generated successfuly`);
  }
}
