module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, warning }
    } = toolbox

    if (typeof parameters.first == 'undefined')
      warning(
        'You give no name for your application, so it will be created in current folder'
      )

    const packageJson = !!parameters.options.sucrase

    template.generate({
      template: `src/package.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'package.json'
          : `${parameters.first}/package.json`,
      props: {
        name: parameters.first || 'unnamedApp',
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/app.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/app.js'
          : `${parameters.first}/src/app/app.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/server.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/server.js'
          : `${parameters.first}/src/server.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/routes.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/routes.js'
          : `${parameters.first}/src/app/routes.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/config/database.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/config/database.js'
          : `${parameters.first}/src/config/database.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/config/config.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/config/ConfigSample.js'
          : `${parameters.first}/src/config/ConfigSample.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/controllers/sampleController.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/controllers/SampleController.js'
          : `${parameters.first}/src/app/controllers/SampleController.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/controllers/indexController.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/controllers/index.js'
          : `${parameters.first}/src/app/controllers/index.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/jobs/job.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/jobs/SampleJob.js'
          : `${parameters.first}/src/app/jobs/SampleJob.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/middlewares/middleware.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/middlewares/SampleMiddleware.js'
          : `${parameters.first}/src/app/middlewares/SampleMiddleware.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/models/sampleModel.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/models/SampleModel.js'
          : `${parameters.first}/src/app/models/SampleModel.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/services/services.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/services/SampleService.js'
          : `${parameters.first}/src/app/services/SampleService.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/app/validators/sampleValidator.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/validators/SampleValidator.js'
          : `${parameters.first}/src/app/validators/SampleValidator.js`,
      props: {
        sucrase: packageJson
      }
    })

    template.generate({
      template: `src/editorConfig.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? '.editorconfig'
          : `${parameters.first}/.editorconfig`
    })

    template.generate({
      template: `src/env.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? '.env'
          : `${parameters.first}/.env`,
      props: {
        name: parameters.first || 'unnamedApp'
      }
    })

    template.generate({
      template: `src/eslintrc.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? '.eslintrc'
          : `${parameters.first}/.eslintrc`
    })

    template.generate({
      template: `src/gitignore.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? '.gitignore'
          : `${parameters.first}/.gitignore`
    })

    template.generate({
      template: `src/prettierrc.js.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? '.prettierrc'
          : `${parameters.first}/.prettierrc`
    })

    if (packageJson) {
      template.generate({
        template: `src/nodemon.js.ejs`,
        target:
          typeof parameters.first == 'undefined'
            ? 'nodemon.json'
            : `${parameters.first}/nodemon.json`
      })
    }

    const message =
      typeof parameters.first == 'undefined'
        ? 'Run "npm install" or "yarn install"'
        : 'Change for your project folder and run "npm install" or "yarn install"'

    success('Project created successfuly!')
    warning(message)
  }
}
