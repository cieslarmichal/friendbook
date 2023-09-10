import { ApplicationError } from '../base/applicationError.js';
export class ValidationError extends ApplicationError {
    constructor(context) {
        super('ValidationError', 'Validation error.', context);
    }
}
