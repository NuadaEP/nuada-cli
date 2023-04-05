import { ISetup, IStacks } from '../dtos';

export interface ISetupMapping {
  execute(stack: IStacks): ISetup;
}
