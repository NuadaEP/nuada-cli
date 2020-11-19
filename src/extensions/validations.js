module.exports = toolbox => {
  async function isNodeProject() {
    const { filesystem } = toolbox;

    const packageJSON = await filesystem.read('package.json', 'json');
    const haveExpress = !!packageJSON.dependencies.express;
    const haveMongoose = !!packageJSON.dependencies.mongoose;

    if (haveExpress && haveMongoose) return true;

    return false;
  }

  async function isSucraseProject() {
    const { filesystem } = toolbox;

    const packageJSON = await filesystem.read('package.json', 'json');
    const { sucrase } = !!packageJSON.devDependencies;

    return sucrase;
  }

  async function validateName(name) {
    if (!name) return false;

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
          throw new Error(
            `The field type is not one of the <${types.join('|')}>`,
          );
        }
      } else if (type === 'Relational') {
        throw new Error(
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

  toolbox.methods = {};

  toolbox.validateName = validateName;
  toolbox.validateExtraValues = validateExtraValues;
  toolbox.isNodeProject = isNodeProject;
  toolbox.isSucraseProject = isSucraseProject;
};
