import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { SerializeLoginKoaResponse } from '@adapters/serializers/routes/authentication/serialize-login-koa-response';
import { SerializeLogoutKoaResponse } from '@adapters/serializers/routes/authentication/serialize-logout-koa-response';

export const authenticationControllerFactory = (
    serializeLoginKoaResponse: SerializeLoginKoaResponse,
    serializeLogoutKoaResponse: SerializeLogoutKoaResponse,
) => {
    const logInController: IInitiatedKoaController = async (ctx) => {
        // ctx.requestTracker.requestedLoginByEmail();

        serializeLoginKoaResponse(ctx);
    };

    const logOutController: IInitiatedKoaController = async (ctx) => {
        // ctx.requestTracker.requestedLogoutByEmail();

        await ctx.logout();

        serializeLogoutKoaResponse(ctx);
    };

    return { logIn: logInController, logOut: logOutController };
};
