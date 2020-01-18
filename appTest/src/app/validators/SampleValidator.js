/**
 * Thats validation must only works for controller with the same name
 * To more validation schema, take a look https://github.com/jquense/yup
 */

const Yup = require('yup')

class SampleValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string().required(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          title: Yup.string(),
          description: Yup.string(),
        });
        break;
    }

    return validationConfig.isValid(body);
  }
}

module.exports = new SampleValidator().validation
