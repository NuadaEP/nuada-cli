module.exports = {
  name: 'make:auth',
  description: 'A complete authentication module using JWT',
  run: async toolbox => {
    const {
      print: { warning, error },
      createAuth,
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

    await createAuth();
  },
};
