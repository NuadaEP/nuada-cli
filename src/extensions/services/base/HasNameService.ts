import { GluegunToolbox } from 'gluegun';
import IDispatchMessages from '../../../helpers/IDispatchMessages/implementations/IDispatchMessages';
import BaseService from './BaseService';

export default class HasNameService extends BaseService {
  constructor(
    toolbox: GluegunToolbox,
    dispatchMessage: IDispatchMessages,
    hasNameValidator = new HasNameValidator(toolbox)
  ) {
    super(toolbox, dispatchMessage);
  }
}
