import { type GluegunToolbox } from 'gluegun';

import { type CreateModule } from 'src/shared';
import { CreateRoute } from '../usecases';

export const makeCreateRoute = (
  toolbox: GluegunToolbox
): CreateModule.Execute => new CreateRoute(toolbox);
