module.exports = {
  name: 'generate:scaffold',
  description: 'A comlete CRUD has been created',
  run: async toolbox => {
    const { parameters, createScaffold, isNodeProject } = toolbox

    if (!(await isNodeProject())) {
      error(
        'This project do not have "mongoose" or "express" packages, so it can not be created'
      )

      warning(
        'Run "npm install mongoose express" or "yarn add mongoose express"'
      )

      return
    }

    await createScaffold(parameters.first, parameters.array)
  }
}
