module.exports = {
  name: 'nuada',
  description: "Let's help you to create your project faster",
  run: async (toolbox) => {
    const {
      print: { warning },
    } = toolbox;

    warning('Type some command like:');
    warning('$ nuada new <project-name>');
    warning('$ nuada new <project-name> --sucrase');
    warning('$ nuada make:controller <controller-name>');
    warning(
      '$ nuada make:validator <validator-name> <field:type>|<field:relational=model_ref>',
    );
    warning(
      '$ nuada make:model <model-name> <field:type>|<field:relational=model_ref>',
    );
    warning(
      '$ nuada make:scaffold <scaffold-name> <field:type>|<field:relational=model_ref>',
    );
    warning('$ nuada make:auth');
    warning('$ nuada make:axios');
    warning('$ nuada make:multer');
  },
};
