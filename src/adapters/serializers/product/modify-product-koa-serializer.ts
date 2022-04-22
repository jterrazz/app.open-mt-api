import * as z from 'zod';
import { IKoaDeserializer, IKoaSerializer } from '@adapters/serializer';
import { ProductEntity } from '@domain/product/product-entity';
import { UserEntity } from '@domain/user/user-entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export const deserializeModifyProductKoaRequest: IKoaDeserializer<{
    authenticatedUser?: UserEntity;
    productId: number;
    productParams: {
        name: string;
    };
}> = (ctx) => {
    const parsedData = zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                name: z.string(),
                productId: z.string().regex(/^\d+$/).transform(Number),
            })
            .parse({
                ...ctx.request.body,
                ...ctx.params,
            }),
    );

    return {
        authenticatedUser: ctx.authenticatedUser,
        productId: parsedData.productId,
        productParams: {
            name: parsedData.name,
        },
    };
};

export const serializeModifyProductKoaResponse: IKoaSerializer<
    ProductEntity
> = (ctx, modifiedProduct) => {
    ctx.body = {
        id: modifiedProduct.id,
        name: modifiedProduct.name,
        priceCentsAmount: modifiedProduct.priceCentsAmount,
        priceCurrency: modifiedProduct.priceCurrency,
    };
};
