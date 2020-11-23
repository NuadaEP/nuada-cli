import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template,
      print: { success, warning },
      prompt,
      system,
    } = toolbox;

    const actions = [
      {
        template: 'src/package.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'package.json'
            : `${parameters.first}/package.json`,
        props: {
          name: parameters.first || 'unnamedApp',
        },
      },
      {
        template: 'src/env.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? '.env'
            : `${parameters.first}/.env`,
        props: {
          name: parameters.first || 'unnamedApp',
        },
      },
      {
        template: 'src/app/app.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/app.js'
            : `${parameters.first}/src/app/app.js`,
      },
      {
        template: 'src/server.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/server.js'
            : `${parameters.first}/src/server.js`,
      },
      {
        template: 'src/app/routes/index.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/routes/index.js'
            : `${parameters.first}/src/app/routes/index.js`,
      },
      {
        template: 'src/app/routes/sample.router.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/routes/sample.router.js'
            : `${parameters.first}/src/app/routes/sample.router.js`,
      },
      {
        template: 'src/config/database.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/config/database.js'
            : `${parameters.first}/src/config/database.js`,
      },
      {
        template: 'src/config/config.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/config/ConfigSample.js'
            : `${parameters.first}/src/config/ConfigSample.js`,
      },
      {
        template: 'src/app/controllers/sampleController.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/controllers/SampleController.js'
            : `${parameters.first}/src/app/controllers/SampleController.js`,
      },
      {
        template: 'src/app/controllers/indexController.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/controllers/index.js'
            : `${parameters.first}/src/app/controllers/index.js`,
      },
      {
        template: 'src/app/jobs/job.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/jobs/SampleJob.js'
            : `${parameters.first}/src/app/jobs/SampleJob.js`,
      },
      {
        template: 'src/app/middlewares/middleware.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/middlewares/SampleMiddleware.js'
            : `${parameters.first}/src/app/middlewares/SampleMiddleware.js`,
      },
      {
        template: 'src/app/models/sampleModel.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/models/SampleModel.js'
            : `${parameters.first}/src/app/models/SampleModel.js`,
      },
      {
        template: 'src/app/errors/AppError.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/errors/AppError.js'
            : `${parameters.first}/src/app/errors/AppError.js`,
      },
      {
        template: 'src/app/services/services.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/services/SampleService.js'
            : `${parameters.first}/src/app/services/SampleService.js`,
      },
      {
        template: 'src/app/validators/sampleValidator.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'src/app/validators/SampleValidator.js'
            : `${parameters.first}/src/app/validators/SampleValidator.js`,
      },
      {
        template: 'src/editorConfig.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? '.editorconfig'
            : `${parameters.first}/.editorconfig`,
      },
      {
        template: 'src/eslintrc.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? '.eslintrc'
            : `${parameters.first}/.eslintrc.js`,
      },
      {
        template: 'src/gitignore.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? '.gitignore'
            : `${parameters.first}/.gitignore`,
      },
      {
        template: 'src/prettierrc.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? '.prettierrc'
            : `${parameters.first}/.prettierrc`,
      },
      {
        template: 'src/nodemon.js.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'nodemon.json'
            : `${parameters.first}/nodemon.json`,
      },
      {
        template: 'src/readme.md.ejs',
        target:
          typeof parameters.first === 'undefined'
            ? 'readme.md'
            : `${parameters.first}/readme.md`,
      },
    ];

    if (typeof parameters.first === 'undefined') {
      const confirm = {
        type: 'select',
        name: 'confirm',
        message:
          'Do you realy want to create your project in that current folder?',
        choices: ['Yes, I do', 'No, lets create a folder'],
      };

      const consoleConfirm = await prompt.ask(confirm);

      if (consoleConfirm.confirm === 'No, lets create a folder') {
        const inputName = {
          type: 'input',
          name: 'inputName',
          message: "What's project name?",
        };

        const projectName = await prompt.ask(inputName);

        parameters.first = projectName.inputName;
      } else {
        warning(
          'You give no name for your application, so it will be created in current folder',
        );
      }
    }

    const pendingActions = actions.map(action => template.generate(action));

    Promise.all(pendingActions);

    warning(
      '<!==================== Git was initialized ====================!>',
    );

    warning(
      '<!==================== We are preparing everything for you ====================!>',
    );

    let cd = '';

    if (typeof parameters.first !== 'undefined')
      cd = `cd ${parameters.first} && `;

    await system.spawn(`${cd}npm install && git init`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    success('Project created successfuly!');
  },
};
