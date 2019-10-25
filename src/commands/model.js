module.exports = {
  name: 'generate:model',
  description: 'Create a simple model inside src/app/models',
  run: async toolbox => {
    const { parameters, createModel } = toolbox

    createModel(parameters.first, parameters.array)
  }
}
