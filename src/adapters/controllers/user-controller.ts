import { IInitiatedKoaController } from '@adapters/controllers';
import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';
import { NotFoundError } from '@domain/error/client/not-found-error';
import {
    deserializeGetUserKoaRequest,
    serializeGetUserKoaResponse,
} from '@adapters/serializers/user/get-user-koa-serializer';
import { getUserPublicProfileFactory } from '@application/use-cases/user/get-user-public-profile';

export const userControllerFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
) => {
    const getPublicProfile: IInitiatedKoaController = async (ctx) => {
        const { userHandle } = deserializeGetUserKoaRequest(ctx);
        const getUserPublicProfile = getUserPublicProfileFactory(
            logger,
            userRepository,
        );

        const userPublicProfile = await getUserPublicProfile(userHandle);

        if (!userPublicProfile) {
            throw new NotFoundError();
        }

        serializeGetUserKoaResponse(ctx, userPublicProfile);
    };

    return { getPublicProfile };
};
