import { TIME_VALIDATION_OF_CREATION_CHECKIN } from '../utils'

export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      `The check-in can only be validated until ${TIME_VALIDATION_OF_CREATION_CHECKIN} minutes of its creation`
    )
  }
}
