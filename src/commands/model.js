module.exports = {
  name: 'generate:model',
  description: 'Create a simple model inside src/app/models',
  run: async toolbox => {
    const { parameters, createModel, isNodeProject } = toolbox

    if (!(await isNodeProject())) {
      error(
        'This project do not have "mongoose" or "express" packages, so it can not be created'
      )

      warning(
        'Run "npm install mongoose express" or "yarn add mongoose express"'
      )

      return
    }

    createModel(parameters.first, parameters.array)
  }
}
