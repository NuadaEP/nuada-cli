import { type GluegunToolbox } from 'gluegun';
import { makeValidator } from '../modules/validators';
import {
  formatModuleName,
  lintProject,
  makeGetPromptCommunication,
} from '../shared';
import ExtraValuesValidator from '../extensions/validators/ExtraValuesValidator';

module.exports = {
  name: 'make:validator',
  description: 'Create a simple validator inside src/app/validators',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const name = formatModuleName(toolbox.parameters.first);

    const extraInstance = new ExtraValuesValidator(toolbox);

    const schemas = extraInstance.execute(toolbox.parameters.array);

    const schemaWithoutRelational = schemas.filter((item) => {
      if (!item) return false;

      const relational = item.type.search('=');

      return relational === -1;
    });

    const communicate = makeGetPromptCommunication(toolbox);

    if (schemaWithoutRelational.length === 0) {
      communicate.execute({
        message: 'Fields and types must be specified to create a validator',
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

    lintProject({ communicate, message: validator.data.message });
  },
};
