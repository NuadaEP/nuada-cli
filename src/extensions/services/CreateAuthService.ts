import { GluegunToolbox } from 'gluegun';
import { IDispatchMessages } from '../../helpers';

import BaseService from './base/BaseService';

export default class CreateAuthService extends BaseService {
  protected readonly actions = [
    {
      template: 'js/src/app/validators/userValidator.js.ejs',
      target: 'src/app/validators/UserValidator.js',
    },
    {
      template: 'src/config/auth.js.ejs',
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

  constructor(toolbox: GluegunToolbox, dispatchMessage: IDispatchMessages) {
    super(toolbox, dispatchMessage);
  }

  public async execute(): Promise<void> {
    await this.toolbox.system.spawn('npm install bcryptjs jsonwebtoken', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await Promise.all(
      this.actions.map((action) => this.toolbox.template.generate(action))
    );

    this.dispatchMessage.success('Authentication module generated successfuly');
  }
}
