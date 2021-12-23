import { GluegunToolbox } from 'gluegun'
import CreateMulterService from '../extensions/services/CreateMulterService'

module.exports = {
  name: 'make:multer',
  description: 'Create a multer configuration service to upload files',
  run: async (toolbox: GluegunToolbox) => {
    const createMulter = new CreateMulterService(toolbox)

    await createMulter.execute()

    await toolbox.system.spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })
  }
}
