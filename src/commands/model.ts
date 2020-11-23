import { GluegunToolbox } from 'gluegun';
import CreateModelService from '../extensions/services/CreateModelService';

module.exports = {
  name: 'make:model',
  description: 'Create a simple model inside src/app/models',
  run: async (toolbox: GluegunToolbox) => {
    const createModel = new CreateModelService(toolbox);

    await createModel.execute({
      name: toolbox.parameters.first,
      params: toolbox.parameters.array,
    });
  },
};
