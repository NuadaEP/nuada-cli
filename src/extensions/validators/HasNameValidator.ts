import { type GluegunToolbox } from 'gluegun';

import { type IDispatchMessages, DispatchMessages } from '../../helpers';

export default class HasNameValidator {
  protected readonly dispatch: IDispatchMessages;

  protected readonly messages = {
    error: 'The name parameter should be passed',
  };

  constructor(toolbox: GluegunToolbox) {
    this.dispatch = new DispatchMessages(toolbox);
  }

  public async execute(name: string): Promise<string | boolean> {
    if (!name) {
      this.dispatch.error(this.messages.error);

      return false;
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
