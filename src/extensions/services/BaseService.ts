import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

interface IBaseService {
  toolbox: GluegunToolbox;
  dispatchMessage: DispatchMessages;
}

export default class BaseService implements IBaseService {
  public toolbox: GluegunToolbox;

  public dispatchMessage: DispatchMessages;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.dispatchMessage = new DispatchMessages(toolbox);
  }
}
