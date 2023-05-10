import { type GluegunToolbox } from 'gluegun';
import { makeUploadFiles } from '../modules';
import { lintProject, makeGetPromptCommunication } from '../shared';

module.exports = {
  name: 'make:multer',
  description: 'Create a multer configuration service to upload files',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const actions = [
      {
        template: 'src/config/multer.ts.ejs',
        target: 'src/config/MulterConfig.ts',
      },
      {
        template: 'src/.gitkeep.ejs',
        target: 'src/uploads/.gitkeep',
      },
    ];

    const createMulter = await makeUploadFiles(toolbox).execute({ actions });

    const communicate = makeGetPromptCommunication(toolbox);

    if (!createMulter.success) {
      communicate.execute({
        type: 'error',
        message: createMulter.data.message,
      });
      return;
    }

    lintProject({
      communicate,
      message: createMulter.data.message,
    });
  },
};
