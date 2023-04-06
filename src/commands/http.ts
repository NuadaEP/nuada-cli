import { type GluegunToolbox } from 'gluegun';
import { makeHttpClient } from '../modules/http-client';
import { lintProject, makeGetPromptCommunication } from '../shared';

module.exports = {
  name: 'make:http',
  description: 'Create a http client service configuration with Axios',
  run: async (toolbox: GluegunToolbox) => {
    const actions = [
      {
        template: 'src/app/services/axios.ts.ejs',
        target: 'src/app/services/AxiosService.ts',
      },
    ];

    const httpClient = await makeHttpClient(toolbox).execute({
      actions,
      name: 'AxiosService.js',
    });

    const communicate = makeGetPromptCommunication(toolbox);

    if (!httpClient.success) {
      communicate.execute({
        type: 'error',
        message: httpClient.data.message,
      });
      return;
    }

    lintProject({
      communicate,
      message: httpClient.data.message,
    });
  },
};
