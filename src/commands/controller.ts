import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'make:controller',
  description: 'Create a simple controller inside src/app/controllers',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { warning, error },
      createController,
      isNodeProject,
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

    await createController(parameters.first);
  },
};
