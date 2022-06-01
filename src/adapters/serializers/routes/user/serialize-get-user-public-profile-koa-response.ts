import { IKoaSerializer } from '@adapters/serializers/routes/koa-serializer';
import { UserEntity } from '@domain/user/user.entity';

export type SerializeGetUserKoaResponse = IKoaSerializer<UserEntity>;

export const serializeGetUserPublicProfileKoaResponse: SerializeGetUserKoaResponse =
    (ctx, user) => {
        ctx.body = {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
        };
    };
