import { type GluegunToolbox } from 'gluegun';
import { type CreateModule } from 'src/shared';
import { CreateMulterService } from '../usecases';

export const makeUploadFiles = (
  toolbox: GluegunToolbox
): CreateModule.Execute => new CreateMulterService(toolbox);
