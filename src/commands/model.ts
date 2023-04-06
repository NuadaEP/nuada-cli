import { type GluegunToolbox } from 'gluegun';
import ExtraValuesValidator from '../extensions/validators/ExtraValuesValidator';
import {
  formatModuleName,
  lintProject,
  makeGetPromptCommunication,
} from '../shared';
import { makeModel, makeValidator } from '../modules';

module.exports = {
  name: 'make:model',
  description: 'Create a simple model inside src/app/models',
  run: async (toolbox: GluegunToolbox) => {
    const name = formatModuleName(toolbox.parameters.first);

    const extraInstance = new ExtraValuesValidator(toolbox);

    const schemas = extraInstance.execute(toolbox.parameters.array);

    const communicate = makeGetPromptCommunication(toolbox);

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
          target: `src/app/validators/${name.data.data}Validator.ts`,
        },
      ],
      schemaWithoutRelational,
      name: name.data.data,
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
          target: `src/app/models/${name.data.data}Model.ts`,
        },
      ],
      schemas,
      name: name.data.data,
    });

    if (!createModel.success) {
      communicate.execute({
        message: createModel.data.message,
        type: 'error',
      });

      return;
    }

    lintProject({ communicate, message: createModel.data.message });
  },
};
