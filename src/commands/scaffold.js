module.exports = {
  name: 'make:scaffold',
  description: 'Create a controller with a complete CRUD, model and validator',
  run: async (toolbox) => {
    const {
      parameters,
      createScaffold,
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

    await createScaffold(parameters.first, parameters.array);
  },
};
