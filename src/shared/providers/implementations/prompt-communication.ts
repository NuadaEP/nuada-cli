import { Communicate } from '@shared/domain'
import { GluegunToolbox } from 'gluegun'

export class PromptCommunication implements Communicate.Execute {
  constructor(private readonly toolbox: GluegunToolbox) {}

  public execute(data: Communicate.Request): Communicate.Response {
    if (data.type === 'success') return this.toolbox.print.success(data.message)
    if (data.type === 'error') return this.toolbox.print.error(data.message)

    return this.toolbox.print.error(data.message)
  }
}
