import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template,
      print: { success, warning, error },
      prompt,
      // filesystem,
      system
    } = toolbox

    if (typeof parameters.first === 'undefined') return error('NAME?')

    const actions = [
      {
        template: 'ts/src/package.ts.ejs',
        target: `${parameters.first}/package.json`,
        props: {
          name: parameters.first
        }
      },
      {
        template: 'ts/src/env.ts.ejs',
        target: `${parameters.first}/.env`,
        props: {
          name: parameters.first
        }
      },
      {
        template: 'ts/src/app/app.ts.ejs',
        target: `${parameters.first}/src/app/app.ts`
      },
      {
        template: 'ts/src/server.ts.ejs',
        target: `${parameters.first}/src/server.ts`
      },
      {
        template: 'ts/src/app/routes/index.ts.ejs',
        target: `${parameters.first}/src/app/routes/index.ts`
      },
      {
        template: 'ts/src/app/routes/sample.router.ts.ejs',
        target: `${parameters.first}/src/app/routes/sample.router.ts`
      },
      {
        template: 'ts/src/config/database.ts.ejs',
        target: `${parameters.first}/src/config/database.ts`
      },
      {
        template: 'ts/src/config/config.ts.ejs',
        target: `${parameters.first}/src/config/ConfigSample.ts`
      },
      {
        template: 'ts/src/app/controllers/sampleController.ts.ejs',
        target: `${parameters.first}/src/app/controllers/SampleController.ts`
      },
      {
        template: 'ts/src/app/jobs/job.ts.ejs',
        target: `${parameters.first}/src/app/jobs/SampleJob.ts`
      },
      {
        template: 'ts/src/app/middlewares/middleware.ts.ejs',
        target: `${parameters.first}/src/app/middlewares/SampleMiddleware.ts`
      },
      {
        template: 'ts/src/app/models/sampleModel.ts.ejs',
        target: `${parameters.first}/src/app/models/SampleModel.ts`
      },
      {
        template: 'ts/src/app/errors/AppError.ts.ejs',
        target: `${parameters.first}/src/app/errors/AppError.ts`
      },
      {
        template: 'ts/src/app/services/services.ts.ejs',
        target: `${parameters.first}/src/app/services/SampleService.ts`
      },
      {
        template: 'ts/src/app/validators/sampleValidator.ts.ejs',
        target: `${parameters.first}/src/app/validators/SampleValidator.ts`
      },
      {
        template: 'ts/src/editorConfig.ts.ejs',
        target: `${parameters.first}/.editorconfig`
      },
      {
        template: 'ts/src/eslintrc.json.ejs',
        target: `${parameters.first}/.eslintrc`
      },
      {
        template: 'ts/src/gitignore.ts.ejs',
        target: `${parameters.first}/.gitignore`
      },
      {
        template: 'ts/src/prettierrc.ts.ejs',
        target: `${parameters.first}/.prettierrc`
      },
      {
        template: 'ts/src/readme.md.ejs',
        target: `${parameters.first}/readme.ms`
      }
    ]

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

    await system.spawn(
      `cd ${parameters.first} && npm install && git init && npm ls`,
      {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      }
    )

    await system.spawn('npx eslint src/ --fix', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })

    success('Project created successfuly!')
  }
}
