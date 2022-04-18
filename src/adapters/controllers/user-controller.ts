import { GetUserPublicProfile } from '@application/use-cases/user/get-user-public-profile';
import { IInitiatedKoaController } from '@adapters/controllers';
import { NotFoundError } from '@domain/error/client/not-found-error';
import {
    deserializeGetUserKoaRequest,
    serializeGetUserKoaResponse,
} from '@adapters/serializers/user/get-user-koa-serializer';

export const userControllerFactory = (
    getUserPublicProfile: GetUserPublicProfile,
) => {
    const getPublicProfile: IInitiatedKoaController = async (ctx) => {
        const { userHandle } = deserializeGetUserKoaRequest(ctx);
        const userPublicProfile = await getUserPublicProfile(userHandle);

        if (!userPublicProfile) {
            throw new NotFoundError();
        }

        serializeGetUserKoaResponse(ctx, userPublicProfile);
    };

    // TODO get user private profile
    // TODO get user private settings
    // TODO get user private subscriptions

    return { getPublicProfile };
};
