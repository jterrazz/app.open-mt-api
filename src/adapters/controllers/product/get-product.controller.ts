import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';

export const getProductControllerFactory = (): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetProduct();
    };
};
