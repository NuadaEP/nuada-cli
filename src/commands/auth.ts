import { type GluegunToolbox } from 'gluegun';

import { lintProject, makeGetPromptCommunication } from '../shared';
import { makeAuthentication } from '../modules/authentication';

module.exports = {
  name: 'make:auth',
  description: 'A complete authentication module using JWT',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const actions = [
      {
        template: 'js/src/app/validators/userValidator.js.ejs',
        target: 'src/app/validators/UserValidator.js',
      },
      {
        template: 'js/src/config/auth.js.ejs',
        target: 'src/config/auth.js',
      },
      {
        template: 'js/src/app/models/userModel.js.ejs',
        target: 'src/app/models/UserModel.js',
      },
      {
        template: 'js/src/app/controllers/userController.js.ejs',
        target: 'src/app/controllers/UserController.js',
      },
      {
        template: 'js/src/app/middlewares/authentication.js.ejs',
        target: 'src/app/middlewares/AuthenticationMiddleware.js',
      },
      {
        template: 'js/src/app/controllers/sessionController.js.ejs',
        target: 'src/app/controllers/SessionController.js',
      },
      {
        template: 'js/src/app/routes/session.router.js.ejs',
        target: 'src/app/routes/session.router.js',
      },
      {
        template: 'js/src/app/routes/user.router.js.ejs',
        target: 'src/app/routes/user.router.js',
      },
    ];

    const authentication = await makeAuthentication(toolbox).execute({
      actions,
      name: 'Auth',
    });

    const communicate = makeGetPromptCommunication(toolbox);

    if (!authentication.success) {
      communicate.execute({
        type: 'error',
        message: authentication.data.message,
      });
      return;
    }

    lintProject({
      communicate,
      message: authentication.data.message,
    });
  },
};
