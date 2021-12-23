import { GluegunToolbox } from 'gluegun'
import DispatchMessages from '../../../helpers/DispatchMessages/implementations/DispatchMessages'
import BaseService from './BaseService'

export default class HasNameService extends BaseService {
  constructor(
    toolbox: GluegunToolbox,
    dispatchMessage: DispatchMessages,
    hasNameValidator = new HasNameValidator(toolbox)
  ) {
    super(toolbox, dispatchMessage)
  }
}
