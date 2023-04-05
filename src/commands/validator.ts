import { GluegunToolbox } from 'gluegun';
import CreateValidatorService from '../extensions/services/CreateValidatorService';
import { DispatchMessages } from '../helpers';

module.exports = {
  name: 'make:validator',
  description: 'Create a simple validator inside src/app/validators',
  run: async (toolbox: GluegunToolbox) => {
    const message = new DispatchMessages(toolbox);

    const createValidator = new CreateValidatorService(toolbox, message);

    await createValidator.execute({
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
