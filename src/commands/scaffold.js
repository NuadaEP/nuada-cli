module.exports = {
  name: 'generate:scaffold',
  description: 'A comlete CRUD has been created',
  run: async toolbox => {
    const { parameters, createScaffold } = toolbox

    await createScaffold(parameters.first, parameters.array)
  }
}
