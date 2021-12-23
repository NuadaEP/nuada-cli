import { GluegunToolbox } from 'gluegun'

import IParamsDTO from './dtos/IParamsDTO'

import CreateControllerService from './CreateControllerService'
import CreateModelService from './CreateModelService'
import CreateRouterService from './CreateRouterService'

export default class CreateScaffoldService {
  protected readonly createModel: CreateModelService

  protected readonly createController: CreateControllerService

  protected readonly createRouter: CreateRouterService

  constructor(toolbox: GluegunToolbox) {
    this.createModel = new CreateModelService(toolbox)
    this.createController = new CreateControllerService(toolbox)
    this.createRouter = new CreateRouterService(toolbox)
  }

  public async execute({ name, params }: IParamsDTO): Promise<void> {
    await this.createModel.execute({ name, params })

    await this.createController.execute({ name, full: true })

    await this.createRouter.execute({ name, full: true })
  }
}
