import * as z from 'zod';
import { LOG_LEVELS } from '@application/contracts/logger';

export const environmentSchema = z.enum(['development', 'test', 'production']);

export const apiConfigSchema = z.object({
    CLIENT: z.object({
        SECRET: z.string().min(10),
    }),
    LOG: z.object({
        LEVEL: z.nativeEnum(LOG_LEVELS),
    }),
    PORT: z.string().regex(/^\d+$/).transform(Number),
    VERSION: z.string(),
});

export const servicesConfigSchema = z.object({
    DATABASE: z.object({
        URL: z.string(),
    }),
    MIXPANEL: z
        .object({
            SECRET: z.string().min(10),
        })
        .optional(),
});

export interface IConfiguration {
    API: z.infer<typeof apiConfigSchema>;
    ENVIRONMENT: z.infer<typeof environmentSchema>;
    SERVICES: z.infer<typeof servicesConfigSchema>;
}
