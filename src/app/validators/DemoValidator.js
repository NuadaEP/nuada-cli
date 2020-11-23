const Yup = require('yup')

class DemoValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          name: Yup.string().required(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          name: Yup.string(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new DemoValidator().validation
