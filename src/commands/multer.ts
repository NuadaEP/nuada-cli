import { GluegunToolbox } from 'gluegun';
import CreateMulterService from '../extensions/services/CreateMulterService';
import IDispatchMessages from '../helpers/IDispatchMessages/implementations/IDispatchMessages';

module.exports = {
  name: 'make:multer',
  description: 'Create a multer configuration service to upload files',
  run: async (toolbox: GluegunToolbox) => {
    const message = new IDispatchMessages(toolbox);

    const createMulter = new CreateMulterService(toolbox, message);

    await createMulter.execute();

    await toolbox.system.spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });
  },
};
