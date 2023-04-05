import { GluegunToolbox } from 'gluegun';
import { IDispatchMessages } from '../../../helpers';
import BaseService from './BaseService';

export default class HasNameService extends BaseService {
  constructor(toolbox: GluegunToolbox, dispatchMessage: IDispatchMessages) {
    super(toolbox, dispatchMessage);
  }
}
