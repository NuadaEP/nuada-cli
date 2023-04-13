import { type GluegunToolbox } from 'gluegun';

import { type CreateModule } from 'src/shared';
import { CreateRouteIndex } from '../usecases';

export const makeCreateRouteIndex = (
  toolbox: GluegunToolbox
): CreateModule.Execute => new CreateRouteIndex(toolbox);
