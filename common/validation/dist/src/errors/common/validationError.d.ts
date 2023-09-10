import { ZodIssue } from 'zod';
import { ApplicationError } from '../base/applicationError.js';
interface Context {
    readonly target: unknown;
    readonly issues: ZodIssue[];
    readonly message: string;
}
export declare class ValidationError extends ApplicationError<Context> {
    constructor(context: Context);
}
export {};
//# sourceMappingURL=validationError.d.ts.map