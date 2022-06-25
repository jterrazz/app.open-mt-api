import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';

export const getProductControllerFactory = (): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetProduct();

        // TODO Test
        ctx.status = 200;
    };
};
