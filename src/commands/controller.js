module.exports = {
  name: 'generate:controller',
  description: 'Create a simple controller inside src/app/controllers',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, error },
      createController
    } = toolbox

    await createController(parameters.first)
  }
}
