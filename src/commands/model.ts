import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'make:model',
  description: 'Create a simple model inside src/app/models',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      createModel,
      isNodeProject,
      print: { error, warning },
    } = toolbox;

    if (!(await isNodeProject())) {
      error(
        'This project do not have "mongoose" or "express" packages, so it can not be created',
      );

      warning(
        'Run "npm install mongoose express" or "yarn add mongoose express"',
      );

      return;
    }

    await createModel(parameters.first, parameters.array);
  },
};
