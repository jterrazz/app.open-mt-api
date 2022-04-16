import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { IInitiatedKoaController } from '@adapters/controllers';
import { IProductRepository } from '@domain/product/product-repository';
import { IShopRepository } from '@domain/shop/shop-repository';
import {
    deserializeModifyProductKoaRequest,
    serializeModifyProductKoaResponse,
} from '@adapters/serializers/product/modify-product-koa-serializer';
import { modifyProductByIdFactory } from '@application/use-cases/product/modify-product-by-id';

export const productControllerFactory = (
    productRepository: IProductRepository,
    shopRepository: IShopRepository,
) => {
    const modifyProduct: IInitiatedKoaController = async (ctx) => {
        const { authenticatedUser, productId, productParams } =
            deserializeModifyProductKoaRequest(ctx);

        if (!authenticatedUser) {
            throw new AuthenticationRequiredError();
        }

        // TODO Move up all the factories
        const modifyProductById = modifyProductByIdFactory(
            productRepository,
            shopRepository,
        );
        const modifiedProduct = await modifyProductById(
            authenticatedUser,
            productId,
            productParams,
        );

        serializeModifyProductKoaResponse(ctx, modifiedProduct);
    };

    return { modifyProduct };
};
