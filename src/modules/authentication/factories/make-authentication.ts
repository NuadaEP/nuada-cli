import { GluegunToolbox } from 'gluegun';

import { CreateAuthentication, CreateAuthenticatior } from '../usecases';

export function makeAuthentication(
  toolbox: GluegunToolbox
): CreateAuthenticatior.Execute {
  const createModule = new CreateAuthentication(toolbox);

  return createModule;
}
