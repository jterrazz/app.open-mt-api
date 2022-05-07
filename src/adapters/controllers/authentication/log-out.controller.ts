import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { SerializeLogoutKoaResponse } from '@adapters/serializers/routes/authentication/serialize-logout-koa-response';

export const logOutControllerFactory = (
    serializeLogoutKoaResponse: SerializeLogoutKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedLogOut();

        await ctx.logout();

        serializeLogoutKoaResponse(ctx);
    };
};
