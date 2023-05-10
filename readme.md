# Nuada CLI

Nuada CLI was designed to improve your development experience by using ExpressJS and Mongoose tools.

# Nuada CLI v1.0.0 🎉🎉🎉

## Installation Guide

To install the Nuada package globally you can run:

```shell
$ npm install nuada -g
```

or

```shell
$ yarn global add nuada
```

## Usage

Now the project will bootstrap with _nuada-config.json_ witch going to map the routes of the project.
So do not edit, move or delete this file 😉

### Create a new project

To start a new project just run:

```shell
$ nuada new <project-name>
```

This command creates an entire folder and pattern structure that will be used to help you to develop. And now it coming up using Typescript 🎉
If you do not specify the project name argument, Nuada CLI will ask you for one.

### Create a controller

```shell
$ nuada make:controller <controller-name>
```

This command generates a simple controller and route file to use in your application.
You don't have to import your new controller inside _router/index.ts_, the CLI is going to handle everything for you 🎉.

### Create a validator

```shell
$ nuada make:validator <validator-name> <field:type>
```

The _make:validator_ creates a validation file based on the passed parameters.

### Create a model

```shell
$ nuada make:model <model-name> <field:type>
```

The _make:model_ creates a simple model file with fields and types based on Mongo type rules.
A validation file is also created following the same rules.

Now you can relate your model with some other one just running:

```shell
$ nuada make:model <model-name> <field:relational=<another-model-name>>
```

The _relational_ field type does not generate a validatable field inside the validation file.

### Create a full module

```shell
$ nuada make:scaffold <scaffold-name> <field:type>
```

The _make:scaffold_ command generates a **controller**, **model** and **validator** file ready to use.
The _field:relational=<another-model-name>_ flag also works here 🎉.

Above you can get a list of valid types:

- String => <field:string>,
- Number => <field:number>
- Date => <field:date>
- Buffer => <field:buffer>
- Boolean => <field:boolean>
- Mixed => <field:mixed>
- Relational => <field:relational=<another-model-name>>

### Create an Authentication module

```shell
$ nuada make:auth
```

The _make:auth_ command creates a simple authentication structure using [JWT](https://jwt.io/) ready to use.

### Create an HTTP client

```shell
$ nuada make:axios
```

The _make:axios_ command creates an HTTP communication module using [Axios](https://github.com/axios/axios).

### Create upload configuration

```shell
$ nuada make:multer
```

The _make:multer_ creates an upload config file using [Multer](https://github.com/expressjs/multer).

Don't forget to import the _multer_ config inside the _route_ file that's going to use the upload service.

```shell
import Multer from 'multer';

import MulterConfig from '../config/MulterConfig';
```

and then use as a middleware:

```shell
routes.post(
  '/user/:id',
  Multer(MulterConfig).single('image'),
  controllers.UserController.store
);
```

# Some Other Commands

```shell
$ nuada version (-v)
$ nuada help (-h)
```

# License

MIT - see LICENSE
