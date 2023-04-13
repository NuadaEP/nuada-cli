import * as fs from 'fs';
import { type Communicate } from '../domain';

type Routes = Array<{
  verb: 'post' | 'get' | 'patch' | 'put' | 'delete';
  endpoint: string;
  methodName: string;
}>;

interface Modules {
  name: string;
  controller: string;
  routes: Routes;
}

export interface NuadaConfig {
  name: string;
  modules: Modules[];
}

export function nuadaConfig(
  moduleName: string,
  communicate: Communicate.Execute,
  controllerType: 'scaffold' | 'single'
): boolean | NuadaConfig {
  try {
    const filepath = 'nuada-config.json';
    const configFile = fs.readFileSync(filepath, 'utf8');

    const jsonConfigFile = JSON.parse(configFile) as NuadaConfig;

    if (jsonConfigFile.modules.find((module) => module.name === moduleName)) {
      communicate.execute({
        message: `The module "${moduleName}" already exists`,
        type: 'error',
      });

      return false;
    }

    const name = moduleName.toLocaleLowerCase();

    let routes: Routes = [];

    if (controllerType === 'scaffold') {
      routes = [
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
      ];
    }

    const newModule: Modules = {
      name: moduleName,
      controller: `${moduleName}Controller`,
      routes: [
        {
          endpoint: `/${name}`,
          verb: 'get',
          methodName: 'index',
        },
        ...routes,
      ],
    };

    const newRegister = {
      ...jsonConfigFile,
      modules: [...jsonConfigFile.modules, newModule],
    };

    fs.writeFileSync(filepath, JSON.stringify(newRegister));

    return newRegister;
  } catch {
    communicate.execute({
      message:
        "Ops! We can't find the nuada-config.json at the root of you project.",
      type: 'error',
    });

    return false;
  }
}
