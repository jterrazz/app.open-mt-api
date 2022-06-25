import { IKoaSerializer } from '@adapters/serializers/routes/koa-serializer';
import { ProductEntity } from '@domain/product/product.entity';
import { StatusCodes } from 'http-status-codes';

export type SerializeCreateProductKoaResponse = IKoaSerializer<ProductEntity>;

export const serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse =
    (ctx, product) => {
        ctx.status = StatusCodes.CREATED;
        ctx.body = {
            id: product.id,
            name: product.name,
            priceCentsAmount: product.priceCentsAmount,
            priceCurrency: product.priceCurrency,
        };
    };
