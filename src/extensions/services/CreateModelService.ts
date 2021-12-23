import { GluegunToolbox } from 'gluegun'

import HasNameValidator from '../validators/HasNameValidator'
import ExtraValuesValidator from '../validators/ExtraValuesValidator'
import CreateValidatorService from './CreateValidatorService'
import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages'

import IParamsDTO from './dtos/IParamsDTO'
import BaseService from './base/BaseService'

export default class CreateModelService extends BaseService {
  protected readonly hasNameValidator: HasNameValidator

  protected readonly extraValuesValidator: ExtraValuesValidator

  protected readonly createValidatadorService: CreateValidatorService

  constructor(toolbox: GluegunToolbox, dispatchMessage: DispatchMessages) {
    super(toolbox, dispatchMessage)

    this.hasNameValidator = new HasNameValidator(toolbox)
    this.extraValuesValidator = new ExtraValuesValidator(toolbox)

    this.createValidatadorService = new CreateValidatorService(
      toolbox,
      dispatchMessage
    )
  }

  public async execute({ name, params }: IParamsDTO): Promise<void> {
    const nameCapitalized = await this.hasNameValidator.execute(name)
    const schemas = this.extraValuesValidator.execute(params)

    if (!nameCapitalized) {
      this.dispatchMessage.error('Model name must be specified')
      return
    }

    if (schemas.length === 0) {
      this.dispatchMessage.error(
        'Fields and types must be specified to create a model'
      )
      this.dispatchMessage.warning(
        `Try something like this: fieldName:type [${this.extraValuesValidator.types.join(
          ' | '
        )}]`
      )
      return
    }

    await this.toolbox.template.generate({
      template: 'js/src/app/models/model.js.ejs',
      target: `src/app/models/${nameCapitalized}Model.js`,
      props: {
        name: `${nameCapitalized}`,
        fields: schemas
      }
    })

    await this.createValidatadorService.execute({
      name,
      params,
      single: false
    })

    this.dispatchMessage.success(
      `Model ${nameCapitalized}Model generated successfuly`
    )
  }
}
