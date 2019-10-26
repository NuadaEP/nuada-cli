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

    template.generate({
      template: 'app.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/app.js'
          : `${parameters.first}/src/app/app.js`
    })

    template.generate({
      template: 'server.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/server.js'
          : `${parameters.first}/src/app/server.js`
    })

    template.generate({
      template: 'routes.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/routes.js'
          : `${parameters.first}/src/app/routes.js`
    })

    template.generate({
      template: 'database.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/config/database.js'
          : `${parameters.first}/src/config/database.js`
    })

    template.generate({
      template: 'config.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/config/ConfigSample.js'
          : `${parameters.first}/src/config/ConfigSample.js`
    })

    template.generate({
      template: 'sampleController.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/controllers/SampleController.js'
          : `${parameters.first}/src/app/controllers/SampleController.js`
    })

    template.generate({
      template: 'indexController.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/controllers/index.js'
          : `${parameters.first}/src/app/controllers/index.js`
    })

    template.generate({
      template: 'job.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/jobs/SampleJob.js'
          : `${parameters.first}/src/app/jobs/SampleJob.js`
    })

    template.generate({
      template: 'middleware.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/middlewares/SampleMiddleware.js'
          : `${parameters.first}/src/app/middlewares/SampleMiddleware.js`
    })

    template.generate({
      template: 'sampleModel.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/models/SampleModel.js'
          : `${parameters.first}/src/app/models/SampleModel.js`
    })

    template.generate({
      template: 'services.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/services/SampleService.js'
          : `${parameters.first}/src/app/services/SampleService.js`
    })

    template.generate({
      template: 'sampleValidator.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/validators/SampleValidator.js'
          : `${parameters.first}/src/app/validators/SampleValidator.js`
    })

    template.generate({
      template: 'editorConfig.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.editorconfig'
          : `${parameters.first}/.editorconfig`
    })

    template.generate({
      template: 'env.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.env'
          : `${parameters.first}/.env`,
      props: {
        name: parameters.first || 'unnamedApp'
      }
    })

    template.generate({
      template: 'eslintrc.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.eslintrc'
          : `${parameters.first}/.eslintrc`
    })

    template.generate({
      template: 'gitignore.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.gitignore'
          : `${parameters.first}/.gitignore`
    })

    template.generate({
      template: 'prettierrc.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.prettierrc'
          : `${parameters.first}/.prettierrc`
    })

    template.generate({
      template: 'nodemon.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'nodemon.json'
          : `${parameters.first}/nodemon.json`
    })

    template.generate({
      template: 'package.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'package.json'
          : `${parameters.first}/package.json`,
      props: {
        name: parameters.first || 'unnamedApp'
      }
    })

    const message =
      typeof parameters.first == 'undefined'
        ? 'Run "npm install" or "yarn install"'
        : 'Change for your project folder and run "npm install" or "yarn install"'

    success('Project created successfuly!')
    warning(message)
  }
}
