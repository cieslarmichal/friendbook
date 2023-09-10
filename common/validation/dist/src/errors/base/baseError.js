export class BaseError extends Error {
    context;
    constructor(name, message, context) {
        super(message);
        this.name = name;
        this.context = context;
    }
}
