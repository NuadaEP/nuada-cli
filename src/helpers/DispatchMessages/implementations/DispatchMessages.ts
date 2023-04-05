import { GluegunToolbox } from 'gluegun';

import { IDispatchMessages } from '../models/IDispatchMessages';

export class DispatchMessages implements IDispatchMessages {
  private readonly toolbox: GluegunToolbox;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;
  }

  public success(message: string): void {
    return this.toolbox.print.success(message);
  }

  public warning(message: string): void {
    return this.toolbox.print.warning(message);
  }

  public error(message: string): void {
    return this.toolbox.print.error(message);
  }
}
