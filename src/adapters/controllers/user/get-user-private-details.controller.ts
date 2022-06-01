import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';

export const getUserPrivateDetailsControllerFactory =
    (): IInitiatedKoaController => {
        return async (ctx) => {
            ctx.requestTracker.requestedGetUserPrivateSettings();
        };
    };
