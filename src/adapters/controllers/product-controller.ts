import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { CreateProduct } from '@application/use-cases/product/create-product';
import { DeserializeCreateProductKoaRequest } from '@adapters/serializers/product/deserialize-create-product-koa-request';
import { DeserializeModifyProductKoaRequest } from '@adapters/serializers/product/deserialize-modify-product-koa-request';
import { ForbiddenClientError } from '@domain/error/client/forbidden-client-error';
import { IInitiatedKoaController } from '@adapters/controller';
import { IShopRepository } from '@domain/shop/shop-repository';
import { ModifyProductById } from '@application/use-cases/product/modify-product-by-id';
import { SerializeCreateProductKoaResponse } from '@adapters/serializers/product/serialize-create-product-koa-response';
import { SerializeModifyProductKoaResponse } from '@adapters/serializers/product/serialize-modify-product-koa-response';

export const productControllerFactory = (
    modifyProductById: ModifyProductById,
    createProduct: CreateProduct,
    shopRepository: IShopRepository,
    deserializeCreateProductKoaRequest: DeserializeCreateProductKoaRequest,
    deserializeModifyProductKoaRequest: DeserializeModifyProductKoaRequest,
    serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse,
    serializeModifyProductKoaResponse: SerializeModifyProductKoaResponse,
) => {
    const modifyProductController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedModifyProduct();

        const { authenticatedUser, productId, productParams } =
            deserializeModifyProductKoaRequest(ctx);

        if (!authenticatedUser) {
            throw new AuthenticationRequiredClientError();
        }

        const modifiedProduct = await modifyProductById(
            authenticatedUser,
            productId,
            productParams,
        );

        serializeModifyProductKoaResponse(ctx, modifiedProduct);
    };

    const createProductController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedCreateProduct();

        const { authenticatedUser, productParams } =
            deserializeCreateProductKoaRequest(ctx);

        // TODO Test
        if (!authenticatedUser) {
            throw new AuthenticationRequiredClientError();
        }

        const shopEntity = await shopRepository.findByOwnerId(
            authenticatedUser.id,
        );

        // TODO Test
        if (!shopEntity) {
            throw new ForbiddenClientError(
                "the authenticated user doesn't have any shop",
            );
        }

        const createdProduct = await createProduct(
            {
                name: productParams.name,
                priceCentsAmount: productParams.priceCentsAmount,
                priceCurrency: productParams.priceCurrency,
            },
            shopEntity.id,
        );

        serializeCreateProductKoaResponse(ctx, createdProduct);
    };

    return {
        createProduct: createProductController,
        modifyProduct: modifyProductController,
    };
};
