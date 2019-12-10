module.exports = {
  name: 'generate:validator',
  description: 'Create a simple validator inside src/app/validators',
  run: async toolbox => {
    const {
      parameters,
      createValidator,
      methods: { isNodeProject }
    } = toolbox

    if (!(await isNodeProject())) {
      error(
        'This project do not have "mongoose" or "express" packages, so it can not be created'
      )

      warning(
        'Run "npm install mongoose express" or "yarn add mongoose express"'
      )

      return
    }

    await createValidator(parameters.first, parameters.array)
  }
}
