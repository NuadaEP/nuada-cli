import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../../helpers/DispatchMessages/implementations/DispatchMessages';

interface IBaseService {
  toolbox: GluegunToolbox;
  dispatchMessage: DispatchMessages;
}

export default class BaseService implements IBaseService {
  constructor(
    public toolbox: GluegunToolbox,
    public dispatchMessage: DispatchMessages,
  ) {
    this.toolbox = toolbox;

    this.dispatchMessage = dispatchMessage;
  }
}
