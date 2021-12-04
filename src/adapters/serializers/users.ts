import * as z from 'zod';

const userPropertySchemas = {
    firstname: z.string(),
    handle: z.string(),
};

const userSchema = z.object(userPropertySchemas);

export const serializeUserHandle = (handle: string): string => {
    return userPropertySchemas.handle.parse(handle);
};

export const serializeUser = (rawUser: unknown) => {
    return userSchema.parse(rawUser);
};
