import { GluegunToolbox } from 'gluegun'
import CreateValidatorService from '../extensions/services/CreateValidatorService'

module.exports = {
  name: 'make:validator',
  description: 'Create a simple validator inside src/app/validators',
  run: async (toolbox: GluegunToolbox) => {
    const createValidator = new CreateValidatorService(toolbox)

    await createValidator.execute({
      name: toolbox.parameters.first,
      params: toolbox.parameters.array
    })

    await toolbox.system.spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })
  }
}
