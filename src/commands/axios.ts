import { GluegunToolbox } from 'gluegun'
import CreateAxiosService from '../extensions/services/CreateAxiosService'
import DispatchMessages from '../helpers/DispatchMessages/implementations/DispatchMessages'

module.exports = {
  name: 'make:axios',
  description: 'Create a axios service configuration',
  run: async (toolbox: GluegunToolbox) => {
    const message = new DispatchMessages(toolbox)
    const createAxiosService = new CreateAxiosService(toolbox, message)

    await createAxiosService.execute()

    await toolbox.system.spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })
  }
}
