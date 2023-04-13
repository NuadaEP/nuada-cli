import { type GluegunToolbox } from 'gluegun';
import { type NuadaConfig } from './nuada-config';
import { makeCreateRoute, makeCreateRouteIndex } from '../../modules/routes';

export async function generateRoutes(
  toolbox: GluegunToolbox,
  nuadaConfig: NuadaConfig
): Promise<void> {
  await makeCreateRoute(toolbox).execute({
    actions: nuadaConfig.modules.map((module) => ({
      target: `src/app/routes/${module.name.toLocaleLowerCase()}.router.ts`,
      template: 'src/app/routes/router-model.ejs',
      props: {
        name: module.name,
        routes: module.routes,
      },
    })),
  });

  await makeCreateRouteIndex(toolbox).execute({
    actions: [
      {
        target: `src/app/routes/index.ts`,
        template: 'src/app/routes/index.ts.ejs',
        props: {
          modules: nuadaConfig.modules,
        },
      },
    ],
  });
}
