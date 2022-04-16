import { IConfiguration } from '@application/contracts';
import { IInitiatedKoaController } from '@adapters/controllers';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';
import { serializeGetApiStateResponse } from '@adapters/serializers/api/get-api-state-koa-serializer';

export const apiControllerFactory = (configuration: IConfiguration) => {
    const getState: IInitiatedKoaController = async (ctx) => {
        const getApiState = getApiStateFactory(
            configuration,
            ctx.requestTracker,
        );

        serializeGetApiStateResponse(ctx, getApiState());
    };

    return { getState };
};
