import { GluegunToolbox } from 'gluegun';
import { makeController } from '../modules';
import {
  formatModuleName,
  lintProject,
  makeGetPromptCommunication,
} from '../shared';

module.exports = {
  name: 'make:controller',
  description: 'Create a simple controller inside src/app/controllers',
  run: async (toolbox: GluegunToolbox) => {
    const controllerName = formatModuleName(toolbox.parameters.first);

    if (!controllerName.success) {
      return {
        success: false,
        data: {
          message: controllerName.data.message,
        },
      };
    }

    const actions = [
      {
        template: 'src/app/controllers/controller.ts.ejs',
        target: `src/app/controllers/${controllerName}Controller.ts`,
        props: { name: `${controllerName}` },
      },
    ];

    const controller = await makeController(toolbox).execute({
      actions,
      name: controllerName.data.data,
    });

    const communicate = makeGetPromptCommunication(toolbox);

    if (!controller.success) {
      communicate.execute({
        message: controller.data.message,
        type: 'error',
      });
    }

    lintProject({
      communicate,
      message: controller.data.message,
    });
  },
};
