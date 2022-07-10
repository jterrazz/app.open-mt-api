import {
    IInitiatedKoaContext,
    IInitiatedKoaController,
} from '@adapters/controllers/koa-controller';
import { IProductRepository } from '@domain/product/product.repository';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { serializeProductForPublic } from '@adapters/serializers/routes/product/serialize-product-for-public';

export const deserializeGetProductKoaRequest = (
    ctx: IInitiatedKoaContext,
): number => {
    const productId = Number(ctx.params.productId);

    if (isNaN(productId)) {
        throw new NotFoundClientError('Product not found');
    }

    return productId;
};

// TODO Stop doing not useful use cases like simple GETs and just pass the repository directly in a controller

export const getProductControllerFactory = (
    productRepository: IProductRepository,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetProduct();

        const productId = deserializeGetProductKoaRequest(ctx);
        const product = await productRepository.findByProductId(productId);

        if (!product) {
            throw new NotFoundClientError('Product not found');
        }

        ctx.status = 200;
        ctx.body = serializeProductForPublic(product);
    };
};
