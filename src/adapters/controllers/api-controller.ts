import { GetApiState } from '@application/use-cases/api/get-api-state';
import { IInitiatedKoaController } from '@adapters/controller';
import { serializeGetApiStateResponse } from '@adapters/serializers/api/get-api-state-koa-serializer';

export const apiControllerFactory = (getApiState: GetApiState) => {
    const getStateController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedGetApiState();

        const apiState = getApiState();

        serializeGetApiStateResponse(ctx, apiState);
    };

    return { getState: getStateController };
};
