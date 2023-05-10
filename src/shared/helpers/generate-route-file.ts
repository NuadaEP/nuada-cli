import { type GluegunToolbox } from 'gluegun';
import { type NuadaModule } from './nuada-config';
import { makeCreateRoute } from '../../modules/routes';

export async function generateRouteFile(
  toolbox: GluegunToolbox,
  modules: NuadaModule[]
): Promise<void> {
  await makeCreateRoute(toolbox).execute({
    actions: modules.map((module) => ({
      target: `src/app/routes/${module.name.toLocaleLowerCase()}.router.ts`,
      template: 'src/app/routes/router-model.ejs',
      props: {
        name: module.name,
        routes: module.routes,
      },
    })),
  });
}
