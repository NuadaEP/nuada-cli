import { GluegunToolbox } from 'gluegun';
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages';

export default class CreateAxiosService {
  protected readonly toolbox: GluegunToolbox;

  protected readonly dispatchMessage: DispatchMessages;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;

    this.dispatchMessage = new DispatchMessages(toolbox);
  }

  public async execute(): Promise<void> {
    await this.toolbox.system.spawn('npm install axios', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await this.toolbox.template.generate({
      template: 'src/app/services/axios.js.ejs',
      target: 'src/app/services/AxiosService.js',
    });

    this.dispatchMessage.success('Axios service generated successfuly');
  }
}
