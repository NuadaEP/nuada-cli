import { GluegunToolbox } from 'gluegun';
import CreateScaffoldService from '../extensions/services/CreateScaffoldService';

module.exports = {
  name: 'make:scaffold',
  description: 'Create a controller with a complete CRUD, model and validator',
  run: async (toolbox: GluegunToolbox) => {
    const createScaffold = new CreateScaffoldService(toolbox);

    await createScaffold.execute({
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
