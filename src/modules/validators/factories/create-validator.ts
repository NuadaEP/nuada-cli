import { type GluegunToolbox } from 'gluegun';

import { CreateYupValidator, type YupValidator } from '../usecases';

export const makeValidator = (toolbox: GluegunToolbox): YupValidator.Execute =>
  new CreateYupValidator(toolbox);
