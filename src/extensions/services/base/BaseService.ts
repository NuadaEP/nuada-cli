import { GluegunToolbox } from 'gluegun';
import { IDispatchMessages } from '../../../helpers';

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
