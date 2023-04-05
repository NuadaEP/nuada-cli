import { GluegunToolbox } from 'gluegun';

import IParamsDTO from './dtos/IParamsDTO';

import CreateControllerService from './CreateControllerService';
import CreateModelService from './CreateModelService';
import CreateRouterService from './CreateRouterService';
import IDispatchMessages from '../../helpers/IDispatchMessages/implementations/IDispatchMessages';

export default class CreateScaffoldService {
  protected readonly createModel: CreateModelService;

  protected readonly createController: CreateControllerService;

  protected readonly createRouter: CreateRouterService;

  constructor(toolbox: GluegunToolbox) {
    const message = new IDispatchMessages(toolbox);

    this.createModel = new CreateModelService(toolbox, message);
    this.createController = new CreateControllerService(toolbox, message);
    this.createRouter = new CreateRouterService(toolbox, message);
  }

  public async execute({ name, params }: IParamsDTO): Promise<void> {
    await this.createModel.execute({ name, params });

    await this.createController.execute({ name, full: true });

    await this.createRouter.execute({ name, full: true });
  }
}
