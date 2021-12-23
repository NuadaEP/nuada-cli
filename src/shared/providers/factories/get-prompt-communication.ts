import { GluegunToolbox } from 'gluegun'

import { Communicate } from '../../domain'
import { PromptCommunication } from '../implementations'

export function makeGetPromptCommunication(
  toolbox: GluegunToolbox
): Communicate.Execute {
  const communicate = new PromptCommunication(toolbox)

  return communicate
}
