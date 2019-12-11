module.exports = {
  name: 'nuada',
  description: 'Create a simple model inside src/app/models',
  run: async toolbox => {
    const {
      print: { warning }
    } = toolbox

    warning('Type some command like:')
    warning('$ nuada new <project-name>')
    warning('$ nuada new <project-name> --sucrase')
    warning('$ nuada generate:controller <controller-name>')
    warning('$ nuada generate:validator <validator-name> <field:type>')
    warning('$ nuada generate:model <model-name> <field:type>')
    warning('$ nuada generate:scaffold <scaffold-name> <field:type>')
  }
}
