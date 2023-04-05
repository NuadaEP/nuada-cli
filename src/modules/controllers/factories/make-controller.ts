import { GluegunToolbox } from 'gluegun';
import { CreateModule } from '../../../shared';
import { CreateController } from '../usecases';

export const makeController = (toolbox: GluegunToolbox): CreateModule.Execute =>
  new CreateController(toolbox);
