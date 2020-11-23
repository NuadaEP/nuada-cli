import { GluegunToolbox } from 'gluegun';
import CreateModelService from '../extensions/services/CreateModelService';

module.exports = {
  name: 'make:multer',
  description: 'Create a multer configuration service to upload files',
  run: async (toolbox: GluegunToolbox) => {
    const createMulter = new CreateModelService(toolbox);

    await createMulter.execute({
      name: toolbox.parameters.first,
      params: toolbox.parameters.array,
    });
  },
};
