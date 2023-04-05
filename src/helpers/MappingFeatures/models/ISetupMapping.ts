import { type ISetup, type IStacks } from '../dtos';

export interface ISetupMapping {
  execute: (stack: IStacks) => ISetup;
}
