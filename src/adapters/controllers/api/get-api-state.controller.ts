import { GetApiState } from '@application/use-cases/api/get-api-state';
import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { SerializeGetApiStateKoaResponse } from '@adapters/serializers/routes/api/serialize-get-api-state-koa-response';

export const getApiStateControllerFactory = (
    getApiState: GetApiState,
    serializeGetApiStateKoaResponse: SerializeGetApiStateKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetApiState();

        const apiState = getApiState();

        serializeGetApiStateKoaResponse(ctx, apiState);
    };
};
