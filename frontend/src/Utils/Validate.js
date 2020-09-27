import * as yup from 'yup';


export default async (schema, data) => {
  try {
    return await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    })
  } catch (error) {
    if(error instanceof yup.ValidationError) {
      const errorMessages = {}

      error.inner.forEach(error => {
        errorMessages[error.path] = error.message
      })

      return {
        error: true,
        errors: await errorMessages
      }
    }
  }
}
