import { INuadaToolbox } from '../@types/INuadaToolbox';
import DispatchMessages from '../helpers/DispatchMessages/implementations/DispatchMessages';
import AppError from '../helpers/DispatchMessages/implementations/DispatchMessages';

interface IPackageJSON {
  express: boolean;
  mongoose: boolean;
}

module.exports = (toolbox: INuadaToolbox) => {
  async function isNodeProject(): Promise<boolean> {
    const { filesystem } = toolbox;

    const { express, mongoose }: IPackageJSON = await filesystem.read(
      'package.json',
      'json',
    );

    if (express && mongoose) return true;

    const dispatch = new DispatchMessages(toolbox);

    dispatch.error(
      'This project do not have "mongoose" or "express" packages, so it can not be created',
    );

    dispatch.warning(
      'Run "npm install mongoose express" or "yarn add mongoose express"',
    );

    return false;
  }

  async function validateName(name: string): Promise<string> {
    if (!name) throw new AppError('The name parameter must be passed');

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function validateExtraValues(params) {
    if (params.length === 0) return false;
    const fields = params.slice(1, params.length);
    const types = [
      'String',
      'Number',
      'Date',
      'Buffer',
      'Boolean',
      'Mixed',
      'Relational',
    ];

    const schemas = fields.map(field => {
      const fieldSplited = field.split(':');
      const type = `${fieldSplited[1]
        .charAt(0)
        .toUpperCase()}${fieldSplited[1].slice(1)}`;

      if (types.indexOf(type) === -1) {
        const relational = type.split('=');

        if (types.indexOf(relational[0]) === -1) {
          throw new AppError(
            `The field type is not one of the <${types.join('|')}>`,
          );
        }
      } else if (type === 'Relational') {
        throw new AppError(
          'You forgot to relate the field to an existing model. It must be like: <field_name:relational=<model_ref>',
        );
      }

      const fieldName = fieldSplited[0];

      return {
        fieldName,
        type,
      };
    });

    return schemas;
  }

  toolbox.validators = {
    isNodeProject,
    validateExtraValues,
    validateName,
  };
};
