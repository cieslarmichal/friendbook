import { ZodTypeAny, infer as zodInfer } from 'zod';
export type SchemaType<S extends ZodTypeAny> = zodInfer<S>;
//# sourceMappingURL=schemaType.d.ts.map