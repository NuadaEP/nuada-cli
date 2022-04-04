import { GluegunToolbox } from 'gluegun'
import { CreateModule } from 'src/shared'
import { CreateController } from '../usecases'

export const makeController = (toolbox: GluegunToolbox): CreateModule.Execute =>
  new CreateController(toolbox)
