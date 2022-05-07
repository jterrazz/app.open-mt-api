import { DeserializeGetUserKoaRequest } from '@adapters/serializers/routes/user/deserialize-get-user-koa-request';
import { GetUserPublicProfile } from '@application/use-cases/user/get-user-public-profile';
import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { SerializeGetUserKoaResponse } from '@adapters/serializers/routes/user/serialize-get-user-koa-response';

export const getUserPublicProfileControllerFactory = (
    getUserPublicProfile: GetUserPublicProfile,
    deserializeGetUserKoaRequest: DeserializeGetUserKoaRequest,
    serializeGetUserKoaResponse: SerializeGetUserKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetUserPublicProfile();

        const { userId } = deserializeGetUserKoaRequest(ctx);

        const userPublicProfile = await getUserPublicProfile(userId);

        if (!userPublicProfile) {
            throw new NotFoundClientError();
        }

        serializeGetUserKoaResponse(ctx, userPublicProfile);
    };
};

// TODO get user private profile
// TODO get user private settings
// TODO get user private subscriptions
