import { BaseError } from './baseError.js';
export class ApplicationError extends BaseError {
    constructor(name, message, context) {
        super(name, message, context);
    }
}
