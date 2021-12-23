import { GluegunToolbox } from 'gluegun'

import { CreateModule } from '../../../shared'
import { CreateAuthentication } from '../services'

export function makeGetCreateAuthentication(
  toolbox: GluegunToolbox
): CreateModule.Execute {
  const createModule = new CreateAuthentication(toolbox)

  return createModule
}
