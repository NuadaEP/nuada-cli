import { GluegunToolbox } from 'gluegun';

import CreateAuthService from '../extensions/services/CreateAuthService';

module.exports = {
  name: 'make:auth',
  description: 'A complete authentication module using JWT',
  run: async (toolbox: GluegunToolbox) => {
    const createAuth = new CreateAuthService(toolbox);

    await createAuth.execute();
  },
};
