# nuada CLI

A CLI designed to facilitate API development using express and mongoose.

## Instalation Guide

To install nuada package you can use:

```shell
$ npm install nuada -g
```

or

```shell
$ yarn global add nuada
```

## Usage

You can start a new project with nuada package just like that:

```shell
$ nuada new <project-name>
```

You can also create a project using [SUCRASE](https://www.npmjs.com/package/sucrase), just doing:

```shell
$ nuada new <project-name> --sucrase
```

Then all your project structure going to follow this lib.

This command creates an entire folder structure and pattern of files that will be used in the project.
If you do not specify the project name, it will be created in the current folder. So be careful, because it can make a mess.

```shell
$ nuada make:controller <controller-name>
```

Generates a simple controller to use in your application. Import it into your routes file to get started.

```shell
$ nuada make:validator <validator-name> <field:type>
```

Creates a validation file based on the passed parameters.

```shell
$ nuada make:model <model-name> <field:type>
```

Create a simple model file with fields and types defined. A validation file is also created following these rules.

```shell
$ nuada make:scaffold <scaffold-name> <field:type>
```

It generates an entire controller structure with a complete CRUD, model and validator ready to be used.

```shell
$ nuada make:auth
```

Create a simple authentication structure using [JWT](https://jwt.io/).

```shell
$ nuada make:axios
```

Create a simple HTTP comunication service using [Axios](https://github.com/axios/axios).

```shell
$ nuada make:multer
```

Create a upload config file using [Multer](https://github.com/expressjs/multer).

# Some Other Commands

```shell
$ nuada version (-v)
$ nuada help (-h)
```

# License

MIT - see LICENSE
