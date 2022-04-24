import { IKoaSerializer } from '@adapters/serializer';

export type SerializeGetUserKoaResponse = IKoaSerializer<{
    firstName: string;
    lastName: string;
}>;

export const serializeGetUserKoaResponse: SerializeGetUserKoaResponse = (
    ctx,
    user,
) => {
    ctx.body = {
        firstName: user.firstName,
        lastName: user.lastName,
    };
};
