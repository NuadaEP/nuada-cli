import { GluegunToolbox } from 'gluegun';

import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

interface ISchemas {
  fieldName: string;
  type: string;
}

export default class ExtraValuesValidator {
  protected readonly dispatch: DispatchMessages;

  protected readonly messages = {
    error: 'Fields and types must be specified to create a model',
    warning:
      'Try something like this: fieldName:type [String, Number, Date, Buffer, Boolean, Mixed]',
  };

  public readonly types = [
    'String',
    'Number',
    'Date',
    'Buffer',
    'Boolean',
    'Mixed',
    'Relational',
  ];

  constructor(toolbox: GluegunToolbox) {
    this.dispatch = new DispatchMessages(toolbox);
  }

  public execute(params: string[]): Array<ISchemas | void> {
    const parameters = params.slice(1, params.length);

    const schemas = parameters.map(parameter => {
      let [, type] = parameter.split(':');
      const [fieldName] = parameter.split(':');

      type = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

      if (this.types.indexOf(type) === -1) {
        const [relational] = type.split('=');

        if (this.types.indexOf(relational) === -1) {
          return this.dispatch.error(
            `The field type is not one of the <${this.types.join('|')}>`,
          );
        }
      } else if (type === 'Relational') {
        return this.dispatch.error(
          'You forgot to relate the field to an existing model. It must be like: <field_name:relational=<model_ref>',
        );
      }

      return {
        fieldName,
        type,
      };
    });

    return schemas;
  }
}
