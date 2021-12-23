import { GluegunToolbox } from 'gluegun'

export interface INuadaToolbox extends GluegunToolbox {
  validators: {
    isNodeProject(): Promise<boolean>
    validateName(name: string): Promise<string>
    validateExtraValues(params: Array<string>): Promise<Array<string>>
  }
}
