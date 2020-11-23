import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

export default class CreateAuthService {
  protected readonly toolbox: GluegunToolbox;

  protected readonly dispatchMessage: DispatchMessages;

  protected readonly actions = [
    {
      template: 'src/app/validators/userValidator.js.ejs',
      target: 'src/app/validators/UserValidator.js',
    },
    {
      template: 'src/config/auth.js.ejs',
      target: 'src/config/auth.js',
    },
    {
      template: 'src/app/models/userModel.js.ejs',
      target: 'src/app/models/UserModel.js',
    },
    {
      template: 'src/app/controllers/userController.js.ejs',
      target: 'src/app/controllers/UserController.js',
    },
    {
      template: 'src/app/middlewares/authentication.js.ejs',
      target: 'src/app/middlewares/AuthenticationMiddleware.js',
    },
    {
      template: 'src/app/controllers/sessionController.js.ejs',
      target: 'src/app/controllers/SessionController.js',
    },
    {
      template: 'src/app/routes/session.router.js.ejs',
      target: 'src/app/routes/session.router.js',
    },
    {
      template: 'src/app/routes/user.router.js.ejs',
      target: 'src/app/routes/user.router.js',
    },
  ];

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.dispatchMessage = new DispatchMessages(toolbox);
  }

  public async execute(): Promise<void> {
    await this.toolbox.system.spawn('npm install bcryptjs jsonwebtoken', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    const promises = this.actions.map(action =>
      this.toolbox.template.generate(action),
    );

    Promise.all(promises);

    this.dispatchMessage.success('Authentication module generated successfuly');
  }
}
