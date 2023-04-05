import type IBaseDTO from './IBaseDTO';

export default interface IParamsDTO extends IBaseDTO {
  params: string[];
}
