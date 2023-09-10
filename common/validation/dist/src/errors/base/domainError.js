import { BaseError } from './baseError.js';
export class DomainError extends BaseError {
    constructor(name, message, context) {
        super(name, message, context);
    }
}
