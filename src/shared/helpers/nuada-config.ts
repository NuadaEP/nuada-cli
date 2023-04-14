import * as fs from 'fs';

type Routes = Array<{
  verb: 'post' | 'get' | 'patch' | 'put' | 'delete';
  endpoint: string;
  methodName: string;
}>;

export interface NuadaModule {
  name: string;
  controller: string;
  routes: Routes;
}

export interface NuadaConfig {
  name: string;
  modules: NuadaModule[];
}

export function nuadaConfig(modules: NuadaModule[]): boolean | NuadaConfig {
  try {
    const filepath = 'nuada-config.json';
    const configFile = fs.readFileSync(filepath, 'utf8');

    const jsonConfigFile = JSON.parse(configFile) as NuadaConfig;

    const newRegister = {
      ...jsonConfigFile,
      modules: [...jsonConfigFile.modules, ...modules],
    };

    fs.writeFileSync(filepath, JSON.stringify(newRegister));

    return newRegister;
  } catch {
    return false;
  }
}
