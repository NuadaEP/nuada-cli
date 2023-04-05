import { GluegunToolbox } from 'gluegun';
import { Communicate } from '../../domain';

export class PromptCommunication implements Communicate.Execute {
  constructor(public readonly toolbox: GluegunToolbox) {}

  public execute(data: Communicate.Request): Communicate.Response {
    if (data.type === 'success')
      return this.toolbox.print.success(data.message);
    if (data.type === 'error') return this.toolbox.print.error(data.message);

    return this.toolbox.print.warning(data.message);
  }
}
