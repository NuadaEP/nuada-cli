import { type GluegunToolbox } from 'gluegun';

import { CreateModel, type CreatorModel } from '../usecases';

export const makeModel = (toolbox: GluegunToolbox): CreatorModel.Execute =>
  new CreateModel(toolbox);
