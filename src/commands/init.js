module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async toolbox => {
    const {
      parameters,
      createScaffold,
      template,
      print: { success, error, warning }
    } = toolbox

    console.log(parameters.first)

    if (typeof parameters.first == 'undefined')
      warning(
        'You give no name for your application, so it will be created in current folder'
      )

    template.generate({
      template: 'app.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/app.js'
          : `src/${parameters.first}/src/app/app.js`
    })

    template.generate({
      template: 'server.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/server.js'
          : `src/${parameters.first}/src/app/server.js`
    })

    template.generate({
      template: 'routes.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/routes.js'
          : `src/${parameters.first}/src/app/routes.js`
    })

    template.generate({
      template: 'database.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/config/database.js'
          : `src/${parameters.first}/src/config/database.js`
    })

    template.generate({
      template: 'config.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/config/ConfigSample.js'
          : `src/${parameters.first}/src/config/ConfigSample.js`
    })

    template.generate({
      template: 'sampleController.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/controllers/SampleController.js'
          : `src/${parameters.first}/src/app/controllers/SampleController.js`
    })

    template.generate({
      template: 'indexController.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/controllers/index.js'
          : `src/${parameters.first}/src/app/controllers/index.js`
    })

    template.generate({
      template: 'job.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/jobs/SampleJob.js'
          : `src/${parameters.first}/src/app/jobs/SampleJob.js`
    })

    template.generate({
      template: 'middleware.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/middlewares/SampleMiddleware.js'
          : `src/${parameters.first}/src/app/middlewares/SampleMiddleware.js`
    })

    template.generate({
      template: 'sampleModel.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/models/SampleModel.js'
          : `src/${parameters.first}/src/app/models/SampleModel.js`
    })

    template.generate({
      template: 'services.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/services/SampleService.js'
          : `src/${parameters.first}/src/app/services/SampleService.js`
    })

    template.generate({
      template: 'sampleValidator.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'src/app/validators/SampleValidator.js'
          : `src/${parameters.first}/src/app/validators/SampleValidator.js`
    })

    template.generate({
      template: 'editorConfig.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.editorconfig'
          : `src/${parameters.first}/.editorconfig`
    })

    template.generate({
      template: 'env.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.env'
          : `src/${parameters.first}/.env`,
      props: {
        name: parameters.first || 'unnamedApp'
      }
    })

    template.generate({
      template: 'eslintrc.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.eslintrc'
          : `src/${parameters.first}/.eslintrc`
    })

    template.generate({
      template: 'gitignore.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.gitignore'
          : `src/${parameters.first}/.gitignore`
    })

    template.generate({
      template: 'prettierrc.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? '.prettierrc'
          : `src/${parameters.first}/.prettierrc`
    })

    template.generate({
      template: 'nodemon.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'nodemon.json'
          : `src/${parameters.first}/nodemon.json`
    })

    template.generate({
      template: 'package.js.ejs',
      target:
        typeof parameters.first == 'undefined'
          ? 'package.json'
          : `src/${parameters.first}/package.json`,
      props: {
        name: parameters.first || 'unnamedApp'
      }
    })
  }
}
