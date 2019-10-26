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

You can use nuada package just like that:

```shell
$ nuada new <project-name>
```

This command creates an entire folder structure and pattern of files that will be used in the project.
If you do not specify the project name, it will be created in the current folder. So be careful, because it can make a mess.

```shell
$ nuada generate:controller <controller-name>
```

Generates a simple controller to use in your application. Import it into your routes file to get started.

```shell
$ nuada generate:validator <validator-name> <field:type>
```

Creates a validation file based on the passed parameters.

```shell
$ nuada generate:model <model-name> <field:type>
```

Create a simple model file with fields and types defined. A validation file is also created following these rules.

```shell
$ nuada generate:scaffold <scaffold-name> <field:type>
```

It generates an entire controller structure with a complete CRUD, model and validator ready to be used.

# Some Other Commands

```shell
$ nuada version (-v)
$ nuada help (-h)
```

# License

MIT - see LICENSE
