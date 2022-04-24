import { IKoaSerializer } from '@adapters/serializer';
import { ProductEntity } from '@domain/product/product-entity';

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
