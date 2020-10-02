module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, warning },
      prompt,
      system
    } = toolbox

    if (typeof parameters.first == 'undefined') {
      const confirm = {
        type: 'select',
        name: 'confirm',
        message:
          'Do you realy want to create your project in that current folder?',
        choices: ['Yes, I do', 'No, lets create a folder']
      }

      const consoleConfirm = await prompt.ask(confirm)

      if (consoleConfirm.confirm == 'No, lets create a folder') {
        const inputName = {
          type: 'input',
          name: 'inputName',
          message: "What's project name?"
        }

        const projectName = await prompt.ask(inputName)

        parameters.first = projectName.inputName
      } else {
        warning(
          'You give no name for your application, so it will be created in current folder'
        )
      }
    }

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
          : `${parameters.first}/.eslintrc.js`
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

    template.generate({
      template: `src/readme.md.ejs`,
      target:
        typeof parameters.first == 'undefined'
          ? 'readme.md'
          : `${parameters.first}/readme.md`
    })

    warning('<!==================== Git was initialized ====================!>')

    warning(
      '<!==================== We are preparing everything for you ====================!>'
    )

    let cd = ''

    if (typeof parameters.first != 'undefined')
      cd = `cd ${parameters.first} && `

    await system.spawn(`${cd}npm install && git init`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })

    success('Project created successfuly!')
  }
}
