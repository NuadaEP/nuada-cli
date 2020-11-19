import { GluegunToolbox } from 'gluegun';

module.exports = (toolbox: GluegunToolbox) => {
  const {
    print: { success, error, warning },
    template,
    system,
  } = toolbox;

  async function createValidator(name, params, single = true) {
    try {
      const sucrase = await toolbox.isSucraseProject();

      const nameCapitalized = await toolbox.validateName(name);
      const schemas = await toolbox.validateExtraValues(params);

      const schemaWithoutRelational = schemas.filter(item => {
        const relational = item.type.search('=');

        return relational === -1;
      });

      if (!nameCapitalized) {
        error('Validator name must be specified');
        return;
      }

      if (
        schemaWithoutRelational.length === 0 ||
        schemaWithoutRelational.indexOf('false') === 0
      ) {
        error('Fields and types must be specified to create a validator');
        warning(
          'Try something like this: fieldName:type [String, Number, Date, Buffer, Boolean, Mixed]',
        );
        return;
      }

      await template.generate({
        template: 'src/app/validators/validator.js.ejs',
        target: `src/app/validators/${nameCapitalized}Validator.js`,
        props: {
          name: `${nameCapitalized}`,
          fields: schemaWithoutRelational,
          sucrase,
        },
      });

      success(`Validator ${nameCapitalized}Validator generated successfuly`);
    } catch ({ message }) {
      if (single) error(message);
    }
  }

  async function createModel(name, params) {
    try {
      const sucrase = await toolbox.isSucraseProject();

      const nameCapitalized = await toolbox.validateName(name);
      const schemas = await toolbox.validateExtraValues(params);

      if (!nameCapitalized) {
        error('Model name must be specified');
        return;
      }

      if (schemas.length === 0 || schemas.indexOf('false') === 0) {
        error('Fields and types must be specified to create a model');
        warning(
          'Try something like this: fieldName:type [String, Number, Date, Buffer, Boolean, Mixed]',
        );
        return;
      }

      await template.generate({
        template: 'src/app/models/model.js.ejs',
        target: `src/app/models/${nameCapitalized}Model.js`,
        props: {
          name: `${nameCapitalized}`,
          fields: schemas,
          sucrase,
        },
      });

      await createValidator(name, params, false);

      success(`Model ${nameCapitalized}Model generated successfuly`);
    } catch ({ message }) {
      error(message);
    }
  }

  async function createController(name, full = false) {
    const sucrase = await toolbox.isSucraseProject();

    const nameCapitalized = await toolbox.validateName(name);

    if (!nameCapitalized) {
      error('Controller name must be specified');
      return;
    }

    await template.generate({
      template: full
        ? 'src/app/controllers/scaffoldController.js.ejs'
        : 'src/app/controllers/controller.js.ejs',
      target: `src/app/controllers/${nameCapitalized}Controller.js`,
      props: { name: `${nameCapitalized}`, sucrase },
    });

    success(`Controller ${nameCapitalized}Controller generated successfuly`);
  }

  async function createRouter(name, full = false) {
    const sucrase = await toolbox.isSucraseProject();

    const nameCapitalized = await toolbox.validateName(name);

    if (!name) {
      error('Route name must be specified');
      return;
    }

    await template.generate({
      template: full
        ? 'src/app/routes/scaffold.router.js.ejs'
        : 'src/app/routes/scaffold.router.js.ejs',
      target: `src/app/routes/${name}.router.js`,
      props: { name: `${name}`, sucrase, nameCapitalized },
    });

    success(`Route ${name}.router generated successfuly`);
  }

  async function createScaffold(name, params) {
    await createModel(name, params);

    await createController(name, true);

    await createRouter(name, true);
  }

  async function createAxiosService() {
    const sucrase = await toolbox.isSucraseProject();

    await system.spawn('npm install axios', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await template.generate({
      template: 'src/app/services/axios.js.ejs',
      target: 'src/app/services/AxiosService.js',
      props: {
        sucrase,
      },
    });

    success('Axios service generated successfuly');
  }

  async function createMulterConfig() {
    const sucrase = await toolbox.isSucraseProject();

    await system.spawn('npm install multer crypto', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await template.generate({
      template: 'src/config/multer.js.ejs',
      target: 'src/config/MulterConfig.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/.gitkeep.ejs',
      target: 'src/uploads/.gitkeep',
      props: {
        sucrase,
      },
    });

    success('Multer config service generated successfuly');
    warning(`
      /-------------------------------------------------------------
      |                       Next Steps                           |
      |                                                            |
      |  -  Import multer lib inside route file;                   |
      |  -  Import MulterConfig file inside route file;            |
      |  -  Add 'Multer(MulterConfigFile).single("file")' as a     |
      |     middleware before your route, thats allow you to       |
      |     receive just one file on controller;                   |
      |  -  Add 'uploads/*' and '!uploads/.gitkeep' to .gitignore; |
      |                                                            |
      |                    Enjoy your uplaod                       |
      |                                                            |
      |                                                            |
      |                                                            |
      |                                                            |
      -------------------------------------------------------------/
    `);
  }

  async function createAuth() {
    const sucrase = await toolbox.isSucraseProject();

    await system.spawn('npm install bcryptjs jsonwebtoken', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await template.generate({
      template: 'src/app/validators/userValidator.js.ejs',
      target: 'src/app/validators/UserValidator.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/config/auth.js.ejs',
      target: 'src/config/auth.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/app/models/userModel.js.ejs',
      target: 'src/app/models/UserModel.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/app/controllers/userController.js.ejs',
      target: 'src/app/controllers/UserController.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/app/middlewares/authentication.js.ejs',
      target: 'src/app/middlewares/AuthenticationMiddleware.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/app/controllers/sessionController.js.ejs',
      target: 'src/app/controllers/SessionController.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/app/routes/session.router.js.ejs',
      target: 'src/app/routes/session.router.js',
      props: {
        sucrase,
      },
    });

    await template.generate({
      template: 'src/app/routes/user.router.js.ejs',
      target: 'src/app/routes/user.router.js',
      props: {
        sucrase,
      },
    });

    success('Authentication module generated successfuly');
  }

  toolbox = {
    ...toolbox,
    createModel,
    createController,
    createRouter,
    createValidator,
    createScaffold,
    createAxiosService,
    createMulterConfig,
    createAuth,
  };
};