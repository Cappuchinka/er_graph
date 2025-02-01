import { z } from 'zod';

const AttributeJSONSchema = z.object({
    name: z.string(),
    type: z.string(),
});

const EntityJSONSchema = z.object({
    name: z.string(),
    columns: z.array(AttributeJSONSchema),
});

const SourceTargetJSONSchema = z.object({
    table: z.string(),
    field: z.string(),
});

const ReferenceJSONSchema = z.object({
    source: SourceTargetJSONSchema,
    target: SourceTargetJSONSchema,
    type: z.string(),
});

const InputJSONSchema = z.object({
    entities: z.array(EntityJSONSchema),
    references: z.array(ReferenceJSONSchema),
});

// Использование:
export const validateInputJSON = (data: unknown) => {
    try {
        return InputJSONSchema.parse(data) !== null;
    } catch (error) {
        return false;
    }
}
