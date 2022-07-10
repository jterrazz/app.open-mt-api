import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { CreateProduct } from '@application/use-cases/product/create-product';
import { DeserializeCreateProductKoaRequest } from '@adapters/serializers/routes/product/deserialize-create-product-koa-request';
import { ForbiddenClientError } from '@domain/error/client/forbidden-client-error';
import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { IShopRepository } from '@domain/shop/shop.repository';
import { SerializeCreateProductKoaResponse } from '@adapters/serializers/routes/product/serialize-create-product-koa-response';
import { StatusCodes } from 'http-status-codes';
import { serializeProductForPublic } from '@adapters/serializers/routes/product/serialize-product-for-public';

export const createProductControllerFactory = (
    createProduct: CreateProduct,
    shopRepository: IShopRepository,
    deserializeCreateProductKoaRequest: DeserializeCreateProductKoaRequest,
    serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedCreateProduct();

        const { authenticatedUser, productParams } =
            deserializeCreateProductKoaRequest(ctx);

        if (!authenticatedUser) {
            throw new AuthenticationRequiredClientError();
        }

        const shopEntity = await shopRepository.findByOwnerId(
            authenticatedUser.id,
        );

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

        // TODO Delete serializer, move tests to controller tests
        // serializeCreateProductKoaResponse(ctx, createdProduct);

        ctx.status = StatusCodes.CREATED;
        ctx.body = serializeProductForPublic(createdProduct);
    };
};
