import { GluegunToolbox } from 'gluegun';
import CreateAxiosService from '../extensions/services/CreateAxiosService';

module.exports = {
  name: 'make:axios',
  description: 'Create a axios service configuration',
  run: async (toolbox: GluegunToolbox) => {
    const createAxiosService = new CreateAxiosService(toolbox);

    await createAxiosService.execute();
  },
};
