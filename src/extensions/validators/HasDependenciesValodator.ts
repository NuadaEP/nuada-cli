import { GluegunToolbox } from 'gluegun'

import DispatchMessages from '../../helpers/DispatchMessages/implementations/DispatchMessages'

interface IPackageJSON {
  express: boolean
  mongoose: boolean
}

export default class HasDependenciesValidator {
  private readonly toolbox: GluegunToolbox

  protected readonly dispatch: DispatchMessages

  protected readonly messages = {
    error:
      'This project do not have "mongoose" or "express" packages, so it can not be created',
    warning: 'Run "npm install mongoose express" or "yarn add mongoose express"'
  }

  constructor(toolbox: GluegunToolbox) {
    this.toolbox = toolbox

    this.dispatch = new DispatchMessages(toolbox)
  }

  public async execute(): Promise<boolean> {
    const { express, mongoose }: IPackageJSON =
      await this.toolbox.filesystem.read('package.json', 'json')

    if (express && mongoose) return true

    this.dispatch.error(this.messages.error)

    this.dispatch.warning(this.messages.warning)

    return false
  }
}
