import * as z from 'zod';
import { LoggerLevels } from '@application/contracts/logger';

// ENVIRONMENT

export const environmentSchema = z.enum(['development', 'test', 'production']);

// API

export const apiConfigSchema = z.object({
    PORT: z.string().regex(/^\d+$/).transform(Number),
    VERSION: z.string(),
});

// LOG

export const logConfigSchema = z.object({
    LEVEL: z.nativeEnum(LoggerLevels),
});

// DATABASE

export const databaseConfigSchema = z.object({
    GENERATED_DATABASE: z.string().optional(),
    URL: z.string(),
});

// CLIENT SESSION

export const clientSessionConfigSchema = z.object({
    SECRET: z.string().min(10),
});

// SERVICES

export const servicesConfigSchema = z.object({
    MIXPANEL: z
        .object({
            SECRET: z.string().min(10),
        })
        .optional(),
});

export interface IConfiguration {
    API: z.infer<typeof apiConfigSchema>;
    ENVIRONMENT: z.infer<typeof environmentSchema>;
    LOG: z.infer<typeof logConfigSchema>;
    DATABASE: z.infer<typeof databaseConfigSchema>;
    CLIENT_SESSION: z.infer<typeof clientSessionConfigSchema>;
    SERVICES: z.infer<typeof servicesConfigSchema>;
}
