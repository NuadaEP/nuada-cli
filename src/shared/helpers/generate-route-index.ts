import { type GluegunToolbox } from 'gluegun';
import { type NuadaConfig } from './nuada-config';
import { makeCreateRouteIndex } from '../../modules/routes';

export async function generateRouteIndex(
  toolbox: GluegunToolbox,
  config: NuadaConfig
): Promise<void> {
  await makeCreateRouteIndex(toolbox).execute({
    actions: [
      {
        target: `src/app/routes/index.ts`,
        template: 'src/app/routes/index.ts.ejs',
        props: {
          modules: config.modules,
        },
      },
    ],
  });
}
