import { GetApiState } from '@application/use-cases/api/get-api-state';
import { IInitiatedKoaController } from '@adapters/controller';
import { SerializeGetApiStateKoaResponse } from '@adapters/serializers/api/serialize-get-api-state-koa-response';

export const apiControllerFactory = (
    getApiState: GetApiState,
    serializeGetApiStateKoaResponse: SerializeGetApiStateKoaResponse,
) => {
    const getStateController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedGetApiState();

        const apiState = getApiState();

        serializeGetApiStateKoaResponse(ctx, apiState);
    };

    return { getState: getStateController };
};
