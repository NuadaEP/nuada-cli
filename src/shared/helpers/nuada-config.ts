import * as fs from 'fs';
import { type Communicate } from '../domain';

interface Modules {
  name: string;
  controller: string;
  routes: Array<{
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
    endpoint: string;
  }>;
}

interface NuadaConfig {
  name: string;
  modules: Modules[];
}

export function nuadaConfig(
  moduleName: string,
  communicate: Communicate.Execute,
  controllerType: 'scaffold' | 'single'
): boolean {
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

    let routes = [];

    if (controllerType === 'scaffold') {
      routes = [
        {
          endpoint: `/${name}/:id`,
          method: 'GET',
        },
        {
          endpoint: `/${name}`,
          method: 'POST',
        },
        {
          endpoint: `/${name}/:id`,
          method: 'PUT',
        },
        {
          endpoint: `/${name}/:id`,
          method: 'DELETE',
        },
      ];
    }

    const newModule: Modules = {
      name: moduleName,
      controller: `${moduleName}Controller`,
      routes: [
        {
          endpoint: `/${name}`,
          method: 'GET',
        },
        ...routes,
      ],
    };

    const newRegister = {
      ...jsonConfigFile,
      modules: [...jsonConfigFile.modules, newModule],
    };

    fs.writeFileSync(filepath, JSON.stringify(newRegister));

    return true;
  } catch {
    communicate.execute({
      message:
        "Ops! We can't find the nuada-config.json at the root of you project.",
      type: 'error',
    });

    return false;
  }
}
