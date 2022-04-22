import * as z from 'zod';
import { IKoaDeserializer, IKoaSerializer } from '@adapters/serializer';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export const deserializeGetUserKoaRequest: IKoaDeserializer<{
    userHandle: string;
}> = (ctx) => {
    return zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                userHandle: z.string(),
            })
            .parse(ctx.params),
    );
};

export const serializeGetUserKoaResponse: IKoaSerializer<{
    firstName: string;
    lastName: string;
}> = (ctx, user) => {
    ctx.body = {
        firstName: user.firstName,
        lastName: user.lastName,
    };
};
