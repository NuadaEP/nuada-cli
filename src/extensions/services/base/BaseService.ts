import { type GluegunToolbox } from 'gluegun';
import { type IDispatchMessages } from '../../../helpers';

interface IBaseService {
  toolbox: GluegunToolbox;
  dispatchMessage: IDispatchMessages;
}

export default class BaseService implements IBaseService {
  constructor(
    public toolbox: GluegunToolbox,
    public dispatchMessage: IDispatchMessages
  ) {
    this.toolbox = toolbox;

    this.dispatchMessage = dispatchMessage;
  }
}
