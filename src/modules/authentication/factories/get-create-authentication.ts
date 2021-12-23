import * as gluegun from 'gluegun'
import { GluegunToolbox } from 'gluegun'

import { CreateModule } from '../../../shared'
import { CreateAuthentication } from '../services'

export function makeGetCreateAuthentication(): CreateModule.Execute {
  const createModule = new CreateAuthentication(
    gluegun as unknown as GluegunToolbox
  )

  return createModule
}
