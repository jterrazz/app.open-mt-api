import { IKoaSerializer } from '@adapters/serializers/routes/koa-serializer';
import { ProductEntity } from '@domain/product/product.entity';

export type SerializeCreateProductKoaResponse = IKoaSerializer<ProductEntity>;

export const serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse =
    (ctx, product) => {
        ctx.body = {
            id: product.id,
            name: product.name,
            priceCentsAmount: product.priceCentsAmount,
            priceCurrency: product.priceCurrency,
        };
    };
