import { IKoaSerializer } from '@adapters/serializer';
import { ProductEntity } from '@domain/product/product-entity';

export type SerializeModifyProductKoaResponse = IKoaSerializer<ProductEntity>;

export const serializeModifyProductKoaResponse: SerializeModifyProductKoaResponse =
    (ctx, modifiedProduct) => {
        ctx.body = {
            id: modifiedProduct.id,
            name: modifiedProduct.name,
            priceCentsAmount: modifiedProduct.priceCentsAmount,
            priceCurrency: modifiedProduct.priceCurrency,
        };
    };
