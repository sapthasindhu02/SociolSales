import * as z from 'zod';

// Define Zod schema for validation
export const columnSchema = z.object({
    name: z.string().min(1, 'Column name is required'),
    type: z.enum(['string', 'integer', 'boolean', 'date']),
});

// The form schema for all columns
export const tableSchema = z.array(columnSchema);
