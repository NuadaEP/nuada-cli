import { GluegunToolbox } from 'gluegun';

export default class CreateAxiosService {
  protected readonly toolbox: GluegunToolbox;

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox;
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

    this.toolbox.success('Axios service generated successfuly');
  }
}
