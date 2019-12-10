module.exports = toolbox => {
  const {
    print: { success, error, warning },
    template
    // methods.validateName,
    // methods.validateExtraValues
  } = toolbox

  console.log(toolbox)

  const templatePath = true

  async function createModel(name, params) {
    const nameCapitalized = await toolbox.methods.validateName(name)
    const schemas = await toolbox.methods.validateExtraValues(params)

    if (!nameCapitalized) {
      error('Model name must be specified')
      return
    }

    if (schemas.length == 0 || schemas.indexOf('false') == 0) {
      error('Fields and types must be specified to create a model')
      warning(
        'Try something like this: fieldName:type [String, Number, Date, Buffer, Boolean, Mixed]'
      )
      return
    }

    await template.generate({
      template: `${templatePath}model.js.ejs`,
      target: `src/app/models/${nameCapitalized}Model.js`,
      props: {
        name: `${nameCapitalized}`,
        fields: schemas
      }
    })

    await createValidator(name, params)

    success(`Model ${nameCapitalized}Model generated successfuly`)
  }

  async function createValidator(name, params) {
    const nameCapitalized = await toolbox.methods.validateName(name)
    const schemas = await toolbox.methods.validateExtraValues(params)

    if (!nameCapitalized) {
      error('Model name must be specified')
      return
    }

    if (schemas.length == 0 || schemas.indexOf('false') == 0) {
      error('Fields and types must be specified to create a validator')
      warning(
        'Try something like this: fieldName:type [String, Number, Date, Buffer, Boolean, Mixed]'
      )
      return
    }

    await template.generate({
      template: `${templatePath}validator.js.ejs`,
      target: `src/app/validators/${nameCapitalized}Validator.js`,
      props: {
        name: `${nameCapitalized}`,
        fields: schemas
      }
    })

    success(`Validator ${nameCapitalized}Validator generated successfuly`)
  }

  async function createController(name, full = false) {
    const nameCapitalized = await toolbox.methods.validateName(name)

    if (!nameCapitalized) {
      error('Controller name must be specified')
      return
    }

    await template.generate({
      template: full
        ? `${templatePath}scaffoldController.js.ejs`
        : `${templatePath}controller.js.ejs`,
      target: `src/app/controllers/${nameCapitalized}Controller.js`,
      props: { name: `${nameCapitalized}` }
    })

    success(`Controller ${nameCapitalized}Controller generated successfuly`)
  }

  async function createScaffold(name, params) {
    await createModel(name, params)

    await createValidator(name, params)

    await createController(name, true)
  }

  toolbox.createModel = createModel
  toolbox.createController = createController
  toolbox.createValidator = createValidator
  toolbox.createScaffold = createScaffold
}
