import { GluegunToolbox } from 'gluegun'
import { makeHttpClient } from 'src/modules/http-client'
import { lintProject, makeGetPromptCommunication } from 'src/shared'

module.exports = {
  name: 'make:axios',
  description: 'Create a axios service configuration',
  run: async (toolbox: GluegunToolbox) => {
    const actions = [
      {
        template: 'js/src/app/services/axios.js.ejs',
        target: 'src/app/services/AxiosService.js'
      }
    ]

    const httpClient = await makeHttpClient(toolbox).execute(actions)

    const communicate = makeGetPromptCommunication(toolbox)

    if (!httpClient.success) {
      return communicate.execute({
        type: 'error',
        message: httpClient.data.message
      })
    }

    return lintProject({
      communicate,
      message: httpClient.data.message
    })
  }
}
