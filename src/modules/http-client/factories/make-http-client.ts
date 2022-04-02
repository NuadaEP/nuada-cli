import { GluegunToolbox } from 'gluegun'
import { CreateModule } from 'src/shared'
import { CreateHttpClient } from '../usecases'

export const makeHttpClient = (toolbox: GluegunToolbox): CreateModule.Execute =>
  new CreateHttpClient(toolbox)
