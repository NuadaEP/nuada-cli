import { type GluegunToolbox } from 'gluegun';
import { makeController } from '../modules';
import {
  formatModuleName,
  lintProject,
  makeGetPromptCommunication,
} from '../shared';
import {
  nuadaConfig,
  generateRouteFile,
  generateRouteIndex,
  type NuadaModule,
} from '../shared/helpers';

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

    const communicate = makeGetPromptCommunication(toolbox);

    const modules: NuadaModule[] = [
      {
        controller: `${controllerName.data.data}Controller`,
        name: controllerName.data.data,
        routes: [
          {
            endpoint: `/${controllerName.data.data.toLocaleLowerCase()}`,
            methodName: 'index',
            verb: 'get',
          },
        ],
      },
    ];

    const config = nuadaConfig(modules);

    if (typeof config === 'boolean') return;

    await Promise.all([
      generateRouteFile(toolbox, modules),
      generateRouteIndex(toolbox, config),
    ]);

    const actions = [
      {
        template: 'src/app/controllers/controller.ts.ejs',
        target: `src/app/controllers/${controllerName.data.data}Controller.ts`,
        props: { name: `${controllerName.data.data}` },
      },
    ];

    const controller = await makeController(toolbox).execute({
      actions,
      name: controllerName.data.data,
    });

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
