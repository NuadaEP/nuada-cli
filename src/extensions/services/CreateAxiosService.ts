import { GluegunToolbox } from 'gluegun';
import BaseService from './BaseService';

export default class CreateAxiosService extends BaseService {
  constructor(toolbox: GluegunToolbox) {
    super(toolbox);
  }

  public async execute(): Promise<void> {
    await this.toolbox.system.spawn('npm install axios', {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    });

    await this.toolbox.template.generate({
      template: 'js/src/app/services/axios.js.ejs',
      target: 'src/app/services/AxiosService.js',
    });

    this.dispatchMessage.success('Axios service generated successfuly');
  }
}
