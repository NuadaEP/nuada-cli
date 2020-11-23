import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

import HasNameValidator from '../validators/HasNameValidator';

import IFullDTO from './dtos/IFullDTO';

export default class CreateRouterService {
  private readonly toolbox: GluegunToolbox;

  protected readonly hasNameValidator: HasNameValidator;

  protected readonly dispatchMessage: DispatchMessages;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.hasNameValidator = new HasNameValidator(toolbox);

    this.dispatchMessage = new DispatchMessages(toolbox);
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
