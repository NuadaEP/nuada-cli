import * as gluegun from 'gluegun'
import { GluegunToolbox } from 'gluegun'

import { Communicate } from '../../domain'
import { PromptCommunication } from '../implementations'

export function makeGetPromptCommunication(): Communicate.Execute {
  const communicate = new PromptCommunication(
    gluegun as unknown as GluegunToolbox
  )

  return communicate
}
