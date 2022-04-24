import { UnprocessableEntityClientError } from '@domain/error/client/unprocessable-entity-client-error';
import { ZodError } from 'zod';

export const zodErrorToUnprocessableEntityErrorWrapper = <T>(
    callback: () => T,
): T => {
    try {
        return callback();
    } catch (error) {
        if (error instanceof ZodError) {
            console.debug('zod error ' + error); // TODO Replace by domain logger with global context

            throw new UnprocessableEntityClientError(
                (error.issues.pop()?.path || []).map(String),
            );
        }

        throw error;
    }
};
