import { type ISetup, type IStacks } from '../dtos';
import { type ISetupMapping } from '../models/ISetupMapping';

export default class SetupMapping implements ISetupMapping {
  execute(stack: IStacks): ISetup {
    const setup = {
      primaryFlag: stack,
    };

    return setup;
  }
}
