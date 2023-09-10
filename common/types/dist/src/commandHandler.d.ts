export interface CommandHandler<Payload, Result> {
    execute(payload: Payload): Promise<Result>;
}
//# sourceMappingURL=commandHandler.d.ts.map