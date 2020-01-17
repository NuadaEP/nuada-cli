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
    warning('$ nuada make:controller <controller-name>')
    warning('$ nuada make:validator <validator-name> <field:type>')
    warning('$ nuada make:model <model-name> <field:type>')
    warning('$ nuada make:scaffold <scaffold-name> <field:type>')
    warning('$ nuada make:auth')
  }
}
