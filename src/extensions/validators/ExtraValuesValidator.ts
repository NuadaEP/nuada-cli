import { type GluegunToolbox } from 'gluegun';

import { type IDispatchMessages, DispatchMessages } from '../../helpers';

interface ISchemas {
  fieldName: string;
  type: string;
}

export default class ExtraValuesValidator {
  protected readonly dispatch: IDispatchMessages;

  public readonly types = [
    'String',
    'Number',
    'Date',
    'Buffer',
    'Boolean',
    'Mixed',
    'Relational',
  ];

  protected readonly messages = {
    error: 'Fields and types must be specified to create a model',
    warning: `Try something like this: fieldName:type [${this.types.join(
      ', '
    )}]`,
  };

  constructor(toolbox: GluegunToolbox) {
    this.dispatch = new DispatchMessages(toolbox);
  }

  public execute(params: string[]): ISchemas[] {
    const parameters = params.slice(1, params.length);

    const schemas = parameters.map((parameter) => {
      let [, type] = parameter.split(':');
      const [fieldName] = parameter.split(':');

      type = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

      if (!this.types.includes(type)) {
        const [relational] = type.split('=');

        if (!this.types.includes(relational)) {
          this.dispatch.error(
            `The field type is not one of the <${this.types.join('|')}>`
          );
          return undefined;
        }
      } else if (type === 'Relational') {
        this.dispatch.error(
          'You forgot to relate the field to an existing model. It must be like: <field_name:relational=<model_ref>'
        );
        return undefined;
      }

      return {
        fieldName,
        type,
      };
    });

    return schemas;
  }
}
