import { type GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'new',
  description: 'Create a complete project structure to use',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const {
      parameters,
      template,
      print: { success, warning, error },
      system,
    } = toolbox;

    if (typeof parameters.first === 'undefined') {
      error(`Maybe you forgot the name of the project, didn't you? 🙃`);
      return;
    }

    const actions = [
      {
        template: 'src/package.ts.ejs',
        target: `${parameters.first}/package.json`,
        props: {
          name: parameters.first,
        },
      },
      {
        template: 'src/env.ts.ejs',
        target: `${parameters.first}/.env`,
        props: {
          name: parameters.first,
        },
      },
      {
        template: 'src/app/app.ts.ejs',
        target: `${parameters.first}/src/app/app.ts`,
      },
      {
        template: 'src/server.ts.ejs',
        target: `${parameters.first}/src/server.ts`,
      },
      {
        template: 'src/app/routes/index-static.ejs',
        target: `${parameters.first}/src/app/routes/index.ts`,
      },
      {
        template: 'src/app/routes/sample.router.ts.ejs',
        target: `${parameters.first}/src/app/routes/sample.router.ts`,
      },
      {
        template: 'src/config/database.ts.ejs',
        target: `${parameters.first}/src/config/database.ts`,
      },
      {
        template: 'src/config/config.ts.ejs',
        target: `${parameters.first}/src/config/ConfigSample.ts`,
      },
      {
        template: 'src/app/controllers/sampleController.ts.ejs',
        target: `${parameters.first}/src/app/controllers/SampleController.ts`,
      },
      {
        template: 'src/app/jobs/job.ts.ejs',
        target: `${parameters.first}/src/app/jobs/SampleJob.ts`,
      },
      {
        template: 'src/app/middlewares/middleware.ts.ejs',
        target: `${parameters.first}/src/app/middlewares/SampleMiddleware.ts`,
      },
      {
        template: 'src/app/models/sampleModel.ts.ejs',
        target: `${parameters.first}/src/app/models/SampleModel.ts`,
      },
      {
        template: 'src/app/errors/AppError.ts.ejs',
        target: `${parameters.first}/src/app/errors/AppError.ts`,
      },
      {
        template: 'src/app/services/services.ts.ejs',
        target: `${parameters.first}/src/app/services/SampleService.ts`,
      },
      {
        template: 'src/app/validators/sampleValidator.ts.ejs',
        target: `${parameters.first}/src/app/validators/SampleValidator.ts`,
      },
      {
        template: 'src/editorConfig.ts.ejs',
        target: `${parameters.first}/.editorconfig`,
      },
      {
        template: 'src/eslintrc.json.ejs',
        target: `${parameters.first}/.eslintrc`,
      },
      {
        template: 'src/gitignore.ts.ejs',
        target: `${parameters.first}/.gitignore`,
      },
      {
        template: 'src/prettierrc.ts.ejs',
        target: `${parameters.first}/.prettierrc`,
      },
      {
        template: 'src/readme.md.ejs',
        target: `${parameters.first}/readme.ms`,
      },
      {
        template: 'src/nuada-config.json.ejs',
        target: `${parameters.first}/nuada-config.json`,
        props: {
          name: parameters.first,
        },
      },
    ];

    await Promise.all(
      actions.map(async (action) => await template.generate(action))
    );

    warning(
      '<!==================== Git was initialized ====================!>'
    );

    warning(
      '<!==================== We are preparing everything for you ====================!>'
    );

    const productionDependencies = [
      'cors',
      'dotenv',
      'express',
      'express-async-errors',
      'mongoose',
      'mongoose-paginate-v2',
      'yup',
    ];

    const developmentDependencies = [
      '@babel/cli',
      '@babel/core',
      '@babel/node',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-decorators',
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@types/cors',
      '@types/express',
      '@types/node',
      '@types/yup',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'babel-plugin-module-resolver',
      'babel-plugin-transform-decorators',
      'babel-plugin-transform-typescript-metadata',
      'eslint',
      'eslint-config-airbnb-base',
      'eslint-config-prettier',
      'eslint-plugin-import',
      'eslint-plugin-prettier',
      'prettier',
      'ts-node-dev',
      'typescript',
    ];

    await system.spawn(
      `cd ${parameters.first} && npm install ${productionDependencies.join(
        ' '
      )} && npm install ${developmentDependencies.join(
        ' '
      )} -D && npm audit fix --force && git init && npm ls`,
      {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit',
      }
    );

    await system.spawn('npx eslint src/ --fix', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    success('Project created successfuly!');
  },
};
