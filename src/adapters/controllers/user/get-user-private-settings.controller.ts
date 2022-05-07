import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';

export const getUserPrivateSettingsControllerFactory =
    (): IInitiatedKoaController => {
        return async (ctx) => {
            ctx.requestTracker.requestedGetUserPrivateSettings();
        };
    };
