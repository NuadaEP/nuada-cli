import { type GluegunToolbox } from 'gluegun';
import { type Communicate } from '../../domain';

export class PromptCommunication implements Communicate.Execute {
  constructor(public readonly toolbox: GluegunToolbox) {}

  public execute(data: Communicate.Request): Communicate.Response {
    if (data.type === 'success') {
      this.toolbox.print.success(data.message);
      return;
    }
    if (data.type === 'error') {
      this.toolbox.print.error(data.message);
      return;
    }

    this.toolbox.print.warning(data.message);
  }
}
