import { type GluegunToolbox } from 'gluegun';

import { type IDispatchMessages } from '../models/IDispatchMessages';

export class DispatchMessages implements IDispatchMessages {
  private readonly toolbox: GluegunToolbox;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;
  }

  public success(message: string): void {
    this.toolbox.print.success(message);
  }

  public warning(message: string): void {
    this.toolbox.print.warning(message);
  }

  public error(message: string): void {
    this.toolbox.print.error(message);
  }
}
