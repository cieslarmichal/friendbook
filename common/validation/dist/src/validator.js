import { ValidationError } from './errors/common/validationError.js';
export class Validator {
    static validate(schema, input) {
        const result = schema.safeParse(input);
        if (!result.success) {
            throw new ValidationError({
                message: result.error.message,
                issues: result.error.issues,
                target: input,
            });
        }
        return result.data;
    }
}
