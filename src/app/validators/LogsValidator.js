const Yup = require('yup')

class LogsValidator {
  validation(body, role) {
    let validationConfig

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          integrationKey: Yup.string().required(),
          originUrl: Yup.string().required(),
          data: Yup.string().required(),
          weight: Yup.number().required(),
          eventType: Yup.string().required(),
          externalResponsableId: Yup.string().required()
        })
        break

      case 'update':
        validationConfig = Yup.object().shape({
          integrationKey: Yup.string(),
          originUrl: Yup.string(),
          data: Yup.string(),
          weight: Yup.number(),
          eventType: Yup.string(),
          externalResponsableId: Yup.string()
        })
        break
      default:
        break
    }

    return validationConfig.validate(body)
  }
}

module.exports = new LogsValidator().validation
