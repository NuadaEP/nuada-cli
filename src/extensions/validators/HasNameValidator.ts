import { GluegunToolbox } from 'gluegun'

import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages'

export default class HasNameValidator {
  protected readonly dispatch: DispatchMessages

  protected readonly messages = {
    error: 'The name parameter should be passed'
  }

  constructor(toolbox: GluegunToolbox) {
    this.dispatch = new DispatchMessages(toolbox)
  }

  public async execute(name: string): Promise<string | boolean> {
    if (!name) {
      this.dispatch.error(this.messages.error)

      return false
    }

    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}
