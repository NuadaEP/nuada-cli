import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template,
      print: { success, warning },
      prompt
      // filesystem,
      // system,
    } = toolbox

    console.log(parameters.raw.includes('-ts'))

    const stack = parameters.raw.includes('-ts') ? 'ts' : 'js'

    const actions = [
      {
        template: `${stack}/src/package.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? 'package.json'
            : `${parameters.first}/package.json`,
        props: {
          name: parameters.first || 'unnamedApp'
        }
      },
      {
        template: `${stack}/src/env.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? '.env'
            : `${parameters.first}/.env`,
        props: {
          name: parameters.first || 'unnamedApp'
        }
      },
      {
        template: `${stack}/src/app/app.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/app.${stack}`
            : `${parameters.first}/src/app/app.${stack}`
      },
      {
        template: `${stack}/src/server.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/server.${stack}`
            : `${parameters.first}/src/server.${stack}`
      },
      {
        template: `${stack}/src/app/routes/index.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/routes/index.${stack}`
            : `${parameters.first}/src/app/routes/index.${stack}`
      },
      {
        template: `${stack}/src/app/routes/sample.router.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/routes/sample.router.${stack}`
            : `${parameters.first}/src/app/routes/sample.router.${stack}`
      },
      {
        template: `${stack}/src/config/database.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/config/database.${stack}`
            : `${parameters.first}/src/config/database.${stack}`
      },
      {
        template: `${stack}/src/config/config.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/config/ConfigSample.${stack}`
            : `${parameters.first}/src/config/ConfigSample.${stack}`
      },
      {
        template: `${stack}/src/app/controllers/sampleController.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/controllers/SampleController.${stack}`
            : `${parameters.first}/src/app/controllers/SampleController.${stack}`
      },
      {
        template: `${stack}/src/app/jobs/job.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/jobs/SampleJob.${stack}`
            : `${parameters.first}/src/app/jobs/SampleJob.${stack}`
      },
      {
        template: `${stack}/src/app/middlewares/middleware.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/middlewares/SampleMiddleware.${stack}`
            : `${parameters.first}/src/app/middlewares/SampleMiddleware.${stack}`
      },
      {
        template: `${stack}/src/app/models/sampleModel.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/models/SampleModel.${stack}`
            : `${parameters.first}/src/app/models/SampleModel.${stack}`
      },
      {
        template: `${stack}/src/app/errors/AppError.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/errors/AppError.${stack}`
            : `${parameters.first}/src/app/errors/AppError.${stack}`
      },
      {
        template: `${stack}/src/app/services/services.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/services/SampleService.${stack}`
            : `${parameters.first}/src/app/services/SampleService.${stack}`
      },
      {
        template: `${stack}/src/app/validators/sampleValidator.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? `src/app/validators/SampleValidator.${stack}`
            : `${parameters.first}/src/app/validators/SampleValidator.${stack}`
      },
      {
        template: `${stack}/src/editorConfig.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? '.editorconfig'
            : `${parameters.first}/.editorconfig`
      },
      {
        template: `${stack}/src/eslintrc.json.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? '.eslintrc'
            : `${parameters.first}/.eslintrc.json`
      },
      {
        template: `${stack}/src/gitignore.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? '.gitignore'
            : `${parameters.first}/.gitignore`
      },
      {
        template: `${stack}/src/prettierrc.${stack}.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? '.prettierrc'
            : `${parameters.first}/.prettierrc`
      },
      {
        template: `${stack}/src/readme.md.ejs`,
        target:
          typeof parameters.first === 'undefined'
            ? 'readme.md'
            : `${parameters.first}/readme.md`
      }
    ]

    if (stack === 'js') {
      actions.push({
        template: 'js/src/app/controllers/indexController.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/controllers/index.js'
            : `${parameters.first}/src/app/controllers/index.js`
      })
    }

    if (typeof parameters.first === 'undefined') {
      const confirm = {
        type: 'select',
        name: 'confirm',
        message:
          'Do you realy want to create your project in that current folder?',
        choices: ['Yes, I do', 'No, lets create a folder']
      }

      const consoleConfirm = await prompt.ask(confirm)

      if (consoleConfirm.confirm === 'No, lets create a folder') {
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

    await Promise.all(actions.map(action => template.generate(action)))

    warning(`=> ${parameters.first}`)

    warning('<!==================== Git was initialized ====================!>')

    warning(
      '<!==================== We are preparing everything for you ====================!>'
    )

    // let cd = '';

    // if (typeof parameters.first !== 'undefined')
    //   cd = `cd ${parameters.first} && `;

    // await system.spawn(`${cd}npm install && git init && npm ls`, {
    //   shell: true,
    //   stdio: 'inherit',
    //   stderr: 'inherit',
    // });

    // await system.spawn(`${cd}npx eslint src/ --fix`, {
    //   shell: true,
    //   stdio: 'inherit',
    //   stderr: 'inherit',
    // });

    success('Project created successfuly!')
  }
}
