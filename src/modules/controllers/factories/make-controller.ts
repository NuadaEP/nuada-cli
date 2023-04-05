import { type GluegunToolbox } from 'gluegun';
import { type CreateModule } from '../../../shared';
import { CreateController } from '../usecases';

export const makeController = (toolbox: GluegunToolbox): CreateModule.Execute =>
  new CreateController(toolbox);
