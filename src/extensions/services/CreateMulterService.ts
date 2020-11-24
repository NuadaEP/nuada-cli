import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

export default class CreateMulterService {
  protected readonly toolbox: GluegunToolbox;

  protected readonly dispatchMessage: DispatchMessages;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.dispatchMessage = new DispatchMessages(toolbox);
  }

  public async execute(): Promise<void> {
    await this.toolbox.system.spawn('npm install multer crypto', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await this.toolbox.template.generate({
      template: 'src/config/multer.js.ejs',
      target: 'src/config/MulterConfig.js',
    });

    await this.toolbox.template.generate({
      template: 'src/.gitkeep.ejs',
      target: 'src/uploads/.gitkeep',
    });

    this.dispatchMessage.success('Multer config service generated successfuly');
    this.dispatchMessage.warning(`
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
}
