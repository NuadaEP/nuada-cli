import { GluegunToolbox } from 'gluegun'

import { CreateModule } from '../../../shared'
import { CreateAuthentication } from '../usecases'

export function makeAuthentication(
  toolbox: GluegunToolbox
): CreateModule.Execute {
  const createModule = new CreateAuthentication(toolbox)

  return createModule
}