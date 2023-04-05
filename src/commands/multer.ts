import { GluegunToolbox } from 'gluegun';
import CreateMulterService from '../extensions/services/CreateMulterService';
import { DispatchMessages } from '../helpers';

module.exports = {
  name: 'make:multer',
  description: 'Create a multer configuration service to upload files',
  run: async (toolbox: GluegunToolbox) => {
    const message = new DispatchMessages(toolbox);

    const createMulter = new CreateMulterService(toolbox, message);

    await createMulter.execute();

    await toolbox.system.spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });
  },
};
