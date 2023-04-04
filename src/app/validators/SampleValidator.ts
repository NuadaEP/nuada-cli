/**
 * Thats validation must only works for controller with the same name
 * To more validation schema, take a look https://github.com/jquense/yup
 */
import { Request } from 'express'
import * as Yup from 'yup';

export type IRole = 'store' | 'update';

class SampleValidator {
  private validationConfig: Yup.ObjectSchema;

  public async execute(body: Request, role: IRole): Promise<void> {
    switch (role) {
      case 'store':
        this.validationConfig = Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string().required(),
        });
        break;

      case 'update':
        this.validationConfig = Yup.object().shape({
          title: Yup.string(),
          description: Yup.string(),
        });
        break;

      default:
        break;
    }

    await this.validationConfig.validate(body);
  }
}

export default new SampleValidator().execute;
