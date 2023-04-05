import { type GluegunToolbox } from 'gluegun';

import { CreateAuthentication, type CreateAuthenticatior } from '../usecases';

export function makeAuthentication(
  toolbox: GluegunToolbox
): CreateAuthenticatior.Execute {
  const createModule = new CreateAuthentication(toolbox);

  return createModule;
}
