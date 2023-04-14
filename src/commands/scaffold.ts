import { type GluegunToolbox } from 'gluegun';
import {
  formatModuleName,
  generateRoutes,
  generateScaffoldModule,
  lintProject,
  makeGetPromptCommunication,
  nuadaConfig,
} from '../shared';
import { makeController, makeModel, makeValidator } from '../modules';
import ExtraValuesValidator from '../extensions/validators/ExtraValuesValidator';

module.exports = {
  name: 'make:scaffold',
  description: 'Create a controller with a complete CRUD, model and validator',
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

    const extraInstance = new ExtraValuesValidator(toolbox);

    const schemas = extraInstance.execute(toolbox.parameters.array);

    const communicate = makeGetPromptCommunication(toolbox);

    const config = nuadaConfig([
      generateScaffoldModule(controllerName.data.data),
    ]);

    if (typeof config === 'boolean') return;

    await generateRoutes(toolbox, config);

    const controllerActions = [
      {
        template: 'src/app/controllers/scaffoldController.ts.ejs',
        target: `src/app/controllers/${controllerName.data.data}Controller.ts`,
        props: { name: `${controllerName.data.data}` },
      },
    ];

    const controller = await makeController(toolbox).execute({
      actions: controllerActions,
      name: controllerName.data.data,
    });

    if (!controller.success) {
      communicate.execute({
        message: controller.data.message,
        type: 'error',
      });
    }

    if (schemas.length === 0) {
      communicate.execute({
        message: 'Fields and types must be specified to create a model',
        type: 'error',
      });
      communicate.execute({
        message: `Try something like this: fieldName:type [${extraInstance.types.join(
          ' | '
        )}]`,
        type: 'warning',
      });
      return;
    }

    const schemaWithoutRelational = schemas.filter((item) => {
      if (!item) return false;

      const relational = item.type.search('=');

      return relational === -1;
    });

    const validator = await makeValidator(toolbox).execute({
      actions: [
        {
          template: 'src/app/validators/validator.ts.ejs',
          target: `src/app/validators/${controllerName.data.data}Validator.ts`,
        },
      ],
      schemaWithoutRelational,
      name: controllerName.data.data,
    });

    if (!validator.success) {
      communicate.execute({
        message: validator.data.message,
        type: 'error',
      });

      return;
    }

    const createModel = await makeModel(toolbox).execute({
      actions: [
        {
          template: 'src/app/models/model.ts.ejs',
          target: `src/app/models/${controllerName.data.data}Model.ts`,
        },
      ],
      schemas,
      name: controllerName.data.data,
    });

    if (!createModel.success) {
      communicate.execute({
        message: createModel.data.message,
        type: 'error',
      });

      return;
    }

    lintProject({
      communicate,
      message: controller.data.message,
    });
  },
};
