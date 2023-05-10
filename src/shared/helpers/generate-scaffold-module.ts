import { type NuadaModule } from './nuada-config';

export function generateScaffoldModule(moduleName: string): NuadaModule {
  const name = moduleName.toLocaleLowerCase();

  return {
    controller: `${moduleName}Controller`,
    name: moduleName,
    routes: [
      {
        endpoint: `/${name}`,
        verb: 'get',
        methodName: 'index',
      },
      {
        endpoint: `/${name}/:id`,
        verb: 'get',
        methodName: 'show',
      },
      {
        endpoint: `/${name}`,
        verb: 'post',
        methodName: 'store',
      },
      {
        endpoint: `/${name}/:id`,
        verb: 'put',
        methodName: 'update',
      },
      {
        endpoint: `/${name}/:id`,
        verb: 'delete',
        methodName: 'delete',
      },
    ],
  };
}
