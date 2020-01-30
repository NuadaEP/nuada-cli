module.exports = {
  name: 'make:multer',
  description: 'Create a multer configuration',
  run: async toolbox => {
    const {
      parameters,
      print: { warning, error },
      createAxiosService,
      isNodeProject
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

    await createAxiosService(parameters.first)
  }
}
