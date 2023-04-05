import { GluegunToolbox } from 'gluegun';
import { makeHttpClient } from '../modules/http-client';
import { lintProject, makeGetPromptCommunication } from '../shared';

module.exports = {
  name: 'make:http',
  description: 'Create a http client service configuration with Axios',
  run: async (toolbox: GluegunToolbox) => {
    const actions = [
      {
        template: 'js/src/app/services/axios.js.ejs',
        target: 'src/app/services/AxiosService.js',
      },
    ];

    const httpClient = await makeHttpClient(toolbox).execute({
      actions,
      name: 'AxiosService.js',
    });

    const communicate = makeGetPromptCommunication(toolbox);

    if (!httpClient.success) {
      return communicate.execute({
        type: 'error',
        message: httpClient.data.message,
      });
    }

    return lintProject({
      communicate,
      message: httpClient.data.message,
    });
  },
};
