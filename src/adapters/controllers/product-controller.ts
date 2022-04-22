import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { IInitiatedKoaController } from '@adapters/controller';
import { ModifyProductById } from '@application/use-cases/product/modify-product-by-id';
import {
    deserializeModifyProductKoaRequest,
    serializeModifyProductKoaResponse,
} from '@adapters/serializers/product/modify-product-koa-serializer';

export const productControllerFactory = (
    modifyProductById: ModifyProductById,
) => {
    const modifyProductController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedModifyProduct();

        const { authenticatedUser, productId, productParams } =
            deserializeModifyProductKoaRequest(ctx);

        if (!authenticatedUser) {
            throw new AuthenticationRequiredError();
        }

        const modifiedProduct = await modifyProductById(
            authenticatedUser,
            productId,
            productParams,
        );

        serializeModifyProductKoaResponse(ctx, modifiedProduct);
    };

    // TODO create product + tracker

    return { modifyProduct: modifyProductController };
};
