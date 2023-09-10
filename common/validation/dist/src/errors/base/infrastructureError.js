import { BaseError } from './baseError.js';
export class InfrastructureError extends BaseError {
    constructor(name, message, context) {
        super(name, message, context);
    }
}
