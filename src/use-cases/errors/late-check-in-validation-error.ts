export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found 🙈🙉🙊')
  }
}

export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated util  20 minutes of its creation. ⏱️',
    )
  }
}
