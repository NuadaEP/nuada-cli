import { GluegunToolbox } from 'gluegun';

import HasNameValidator from '../validators/HasNameValidator';

import IFullDTO from './dtos/IFullDTO';

export default class CreateModelService {
  private readonly toolbox: GluegunToolbox;

  protected readonly hasNameValidator: HasNameValidator;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.hasNameValidator = new HasNameValidator(toolbox);
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

    this.toolbox.success(
      `Controller ${nameCapitalized}Controller generated successfuly`,
    );
  }
}
