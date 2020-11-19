import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'make:axios',
  description: 'Create a axios service configuration',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { warning, error },
      createAxiosService,
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

    await createAxiosService(parameters.first);
  },
};
