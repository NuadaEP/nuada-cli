import { type GluegunToolbox } from 'gluegun';

import {
  type NuadaModule,
  generateRouteFile,
  generateRouteIndex,
  lintProject,
  makeGetPromptCommunication,
  nuadaConfig,
} from '../shared';
import { makeAuthentication } from '../modules/authentication';

module.exports = {
  name: 'make:auth',
  description: 'A complete authentication module using JWT',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const actions = [
      {
        template: 'src/app/validators/userValidator.ts.ejs',
        target: 'src/app/validators/UserValidator.ts',
      },
      {
        template: 'src/config/auth.ts.ejs',
        target: 'src/config/auth.ts',
      },
      {
        template: 'src/app/models/userModel.ts.ejs',
        target: 'src/app/models/UserModel.ts',
      },
      {
        template: 'src/app/controllers/userController.ts.ejs',
        target: 'src/app/controllers/UserController.ts',
      },
      {
        template: 'src/app/middlewares/authentication.ts.ejs',
        target: 'src/app/middlewares/AuthenticationMiddleware.ts',
      },
      {
        template: 'src/app/controllers/sessionController.ts.ejs',
        target: 'src/app/controllers/SessionController.ts',
      },
      {
        template: 'src/app/routes/user.router.ts.ejs',
        target: 'src/app/routes/user.router.ts',
      },
    ];
    const communicate = makeGetPromptCommunication(toolbox);

    const modules: NuadaModule[] = [
      {
        controller: 'SessionController',
        name: 'Session',
        routes: [
          {
            endpoint: '/auth',
            methodName: 'store',
            verb: 'post',
          },
        ],
      },
      {
        controller: 'UserController',
        name: 'User',
        routes: [
          {
            endpoint: '/user',
            methodName: 'show',
            verb: 'get',
          },
          {
            endpoint: '/user',
            methodName: 'store',
            verb: 'post',
          },
        ],
      },
    ];

    const config = nuadaConfig(modules);

    if (typeof config === 'boolean') return;

    await Promise.all([
      generateRouteFile(toolbox, modules),
      generateRouteIndex(toolbox, config),
    ]);

    const authentication = await makeAuthentication(toolbox).execute({
      actions,
    });

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
