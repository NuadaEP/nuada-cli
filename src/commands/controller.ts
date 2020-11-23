import { GluegunToolbox } from 'gluegun';
import CreateControllerService from '../extensions/services/CreateControllerService';

module.exports = {
  name: 'make:controller',
  description: 'Create a simple controller inside src/app/controllers',
  run: async (toolbox: GluegunToolbox) => {
    const createController = new CreateControllerService(toolbox);

    await createController.execute({ name: toolbox.parameters.first });
  },
};
