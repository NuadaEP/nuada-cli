module.exports = toolbox => {
  async function validateName(name) {
    if (!name) return false

    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  async function validateExtraValues(params) {
    if (params.length == 0) return false
    const fields = params.slice(1, params.length)
    const types = ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed']

    const schemas = fields.map(field => {
      const fieldSplited = field.split(':')
      const type = `${fieldSplited[1]
        .charAt(0)
        .toUpperCase()}${fieldSplited[1].slice(1)}`

      if (types.indexOf(type) != 0) return 'false'

      const fieldName = fieldSplited[0]

      return {
        fieldName,
        type
      }
    })

    return schemas
  }

  toolbox.validateName = validateName
  toolbox.validateExtraValues = validateExtraValues
}
