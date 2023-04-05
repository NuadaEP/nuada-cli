import { type GluegunToolbox } from 'gluegun';
import { type IDispatchMessages } from '../../../helpers';
import BaseService from './BaseService';

export default class HasNameService extends BaseService {
  constructor(toolbox: GluegunToolbox, dispatchMessage: IDispatchMessages) {
    super(toolbox, dispatchMessage);
  }
}
