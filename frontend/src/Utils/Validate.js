import * as yup from "yup";
export default class Validate {
  constructor(schema, data) {
    this.schema = schema;
    this.data = data;
  }

  async exec() {
    try {
      return await this.schema.validate(this.data, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {

        if (typeof this.data === 'object') {
          const errorMessages = {};
          error.inner.forEach((error) => {
            errorMessages[error.path] = error.message;
          });
          return {
            error: true,
            errors: await errorMessages,
          };
        } else {
          return {
            error: true,
            errors: error.inner[0].message
          };
        }
      }
    }
  }

  // static updateValidate(data) {
  //   return this.exec(UpdateSchema, data);
  // }
}
