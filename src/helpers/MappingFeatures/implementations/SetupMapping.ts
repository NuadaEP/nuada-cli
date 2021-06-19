import { ISetup, IStacks } from '../dtos';
import { ISetupMapping } from '../models/ISetupMapping';

export default class SetupMapping implements ISetupMapping {
  execute(stack: IStacks): ISetup {
    const setup = {
      primaryFlag: stack,
    };

    return setup;
  }
}
