import { GluegunToolbox } from 'gluegun';
import CreateModelService from '../extensions/services/CreateModelService';
import IDispatchMessages from '../helpers/IDispatchMessages/implementations/IDispatchMessages';

module.exports = {
  name: 'make:model',
  description: 'Create a simple model inside src/app/models',
  run: async (toolbox: GluegunToolbox) => {
    const message = new IDispatchMessages(toolbox);

    const createModel = new CreateModelService(toolbox, message);

    await createModel.execute({
      name: toolbox.parameters.first,
      params: toolbox.parameters.array,
    });

    await toolbox.system.spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });
  },
};
