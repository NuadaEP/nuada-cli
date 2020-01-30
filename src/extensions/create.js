module.exports = toolbox => {
  const {
    print: { success, error, warning },
    template,
    system
  } = toolbox

  async function createModel(name, params) {
    const sucrase = await toolbox.isSucraseProject()

    const nameCapitalized = await toolbox.validateName(name)
    const schemas = await toolbox.validateExtraValues(params)

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
      template: `src/app/models/model.js.ejs`,
      target: `src/app/models/${nameCapitalized}Model.js`,
      props: {
        name: `${nameCapitalized}`,
        fields: schemas,
        sucrase
      }
    })

    await createValidator(name, params)

    success(`Model ${nameCapitalized}Model generated successfuly`)
  }

  async function createValidator(name, params) {
    const sucrase = await toolbox.isSucraseProject()

    const nameCapitalized = await toolbox.validateName(name)
    const schemas = await toolbox.validateExtraValues(params)

    if (!nameCapitalized) {
      error('Validator name must be specified')
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
      template: `src/app/validators/validator.js.ejs`,
      target: `src/app/validators/${nameCapitalized}Validator.js`,
      props: {
        name: `${nameCapitalized}`,
        fields: schemas,
        sucrase
      }
    })

    success(`Validator ${nameCapitalized}Validator generated successfuly`)
  }

  async function createController(name, full = false) {
    const sucrase = await toolbox.isSucraseProject()

    const nameCapitalized = await toolbox.validateName(name)

    if (!nameCapitalized) {
      error('Controller name must be specified')
      return
    }

    await template.generate({
      template: full
        ? `src/app/controllers/scaffoldController.js.ejs`
        : `src/app/controllers/controller.js.ejs`,
      target: `src/app/controllers/${nameCapitalized}Controller.js`,
      props: { name: `${nameCapitalized}`, sucrase }
    })

    success(`Controller ${nameCapitalized}Controller generated successfuly`)
  }

  async function createScaffold(name, params) {
    await createModel(name, params)

    await createValidator(name, params)

    await createController(name, true)
  }

  async function createAxiosService() {
    const sucrase = await toolbox.isSucraseProject()

    await system.spawn('npm install axios', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })

    await template.generate({
      template: `src/app/services/axios.js.ejs`,
      target: `src/app/services/AxiosService.js`,
      props: {
        sucrase
      }
    })

    success(`Axios service generated successfuly`)
  }

  async function createMulterConfig() {
    const sucrase = await toolbox.isSucraseProject()

    await system.spawn('npm install multer crypto', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })

    await template.generate({
      template: `src/config/multer.js.ejs`,
      target: `src/config/MulterConfig.js`,
      props: {
        sucrase
      }
    })

    await template.generate({
      template: `src/.gitkeep.ejs`,
      target: `src/uploads/.gitkeep`,
      props: {
        sucrase
      }
    })

    success(`Multer config service generated successfuly`)
    warning(`==========Next steps==========`)
    warning(`- Import multer lib to your route file`)
    warning(`- Import multerConfig file to your route file`)
    warning(
      `- Add 'Multer(multerConfigFile).single("file")' as a middleware of a route, thats allow you to receive just one file on controller`
    )
    warning(`- Add this lines to your .gitignore file: `)
    warning(`--- uploads/*`)
    warning(`--- !uploads/.gitkeep`)
  }

  async function createAuth() {
    const sucrase = await toolbox.isSucraseProject()

    await system.spawn('npm install bcryptjs jsonwebtoken', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })

    await template.generate({
      template: `src/app/validators/userValidator.js.ejs`,
      target: `src/app/validators/UserValidator.js`,
      props: {
        sucrase
      }
    })

    await template.generate({
      template: `src/config/auth.js.ejs`,
      target: `src/config/AuthConfig.js`,
      props: {
        sucrase
      }
    })

    await template.generate({
      template: `src/app/models/userModel.js.ejs`,
      target: `src/app/models/UserModel.js`,
      props: {
        sucrase
      }
    })

    await template.generate({
      template: `src/app/controllers/userController.js.ejs`,
      target: `src/app/controllers/UserController.js`,
      props: {
        sucrase
      }
    })

    await template.generate({
      template: `src/app/middlewares/authentication.js.ejs`,
      target: `src/app/middlewares/AuthenticationMiddleware.js`,
      props: {
        sucrase
      }
    })

    await template.generate({
      template: `src/app/controllers/sessionController.js.ejs`,
      target: `src/app/controllers/SessionController.js`,
      props: {
        sucrase
      }
    })

    success(`Authentication module generated successfuly`)
  }

  toolbox.createModel = createModel
  toolbox.createController = createController
  toolbox.createValidator = createValidator
  toolbox.createScaffold = createScaffold
  toolbox.createAxiosService = createAxiosService
  toolbox.createMulterConfig = createMulterConfig
  toolbox.createAuth = createAuth
}
